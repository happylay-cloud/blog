---
# 文章标题
title: redis实现分布式锁
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2021-02-01 12:11:48
# 所属标签（可以设置多个🏷）
tags:
  - java
# 所属分类（可以设置多个💖）
categories:
  - 后端
# 是否开启侧边栏
sidebar: "auto"
# 文章置顶（数字代表排序权重📚）
sticky: 0
# 文章是否发布 true（发布）false(草稿)
publish: true
---

---

摘要: redis实现分布式锁
时间: 2021-02-01

---

<img src="/img/6.jpg" width="256px" height="144px">

<!-- more -->

## redis实现分布式锁
```java
package com.happylay.config.redis.lock;

import com.happylay.config.redis.write.RedisStringReadWriteService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * 分布式锁
 *
 * @Author: happylay
 * @Date: Created in 2020-06-18 13:22
 */
@Component
@Slf4j
public class RedisLock {

    @Autowired
    private RedisStringReadWriteService redisStringReadWriteService;

    private ThreadLocal<String> threadLocal = new ThreadLocal<>();

    /**
     * 加锁
     *
     * @param key     加锁业务
     * @param timeOut 超时时间
     * @param unit    时间单位 （TimeUnit.SECONDS）
     * @return
     */
    public Boolean lock(String key, Long timeOut, TimeUnit unit) {

        // 加个判断在同一个线程中threadLock中有值得话，就是表明该该线程已经获取过锁了，我们直接返回true ，保证锁的可重入性
        if (threadLocal.get() == null) {
            // 新启动一个线程，每隔10s给锁加过期时间，防止业务时间超过过期时间
            Thread addThread = new Thread(() -> {

                // TODO 获取锁的超时时间，超过这个时间则放弃获取锁（默认超时时间30分钟，防止线程未被释放）
                long end = System.currentTimeMillis() + 1000 * 60 * 30;

                while (true && System.currentTimeMillis() < end) {
                    try {
                        // 每隔十秒延迟锁时长
                        Thread.sleep(10000);
                        // 延长锁时长
                        redisStringReadWriteService.expire(key, timeOut, unit);
                    } catch (Exception e) {
                        log.warn("RedisLock释放分布式锁，同时主动中断线程。{}", e.getMessage());
                    }
                }
            });

            // 启动线程
            addThread.start();
            // 保证不同线程锁的唯一性
            String uuid = addThread.getId() + ":" + UUID.randomUUID().toString();
            // 设置当前线程唯一编号
            threadLocal.set(uuid);
            // 在redis中插入一条key超时时间为30s把添加过期时间的线程id也作为key，后面通过id在释放锁的时候停止该线程
            Boolean isLock = redisStringReadWriteService.setIfAbsent(key, uuid, timeOut, unit);

            // TODO 尝试获取锁超时时间（默认1分钟）
            long endTime = System.currentTimeMillis() + 1000 * 60 * 1;

            // 支持阻塞性获取锁失败重复去获取锁
            while (!isLock) {

                // 尝试重新获取锁
                isLock = redisStringReadWriteService.setIfAbsent(key, uuid, timeOut, unit);

                // TODO 如果1分钟之内未获取到锁，直接返回
                if (!isLock && System.currentTimeMillis() < endTime) {

                    // TODO 终止当前未获取锁线程（延长持有锁时间线程）
                    stopThread();

                    return false;
                }

            }

            return isLock;

        } else {
            return true;
        }

    }

    /**
     * 解锁
     *
     * @param key 业务主键
     * @return
     */
    public void release(String key) {

        // 加一个线程id判断，防止其他线程业务锁释放掉其他业务的锁
        if (threadLocal.get().equals(redisStringReadWriteService.get(key))) {
            // 获取延期的线程id停止该线程
            String s = redisStringReadWriteService.get(key);
            String[] split = s.split(":");

            // 查找当前线程
            Thread thread = findThread(Long.parseLong(split[0]));
            if (null != thread) {
                thread.interrupt();
            }
            // 释放锁
            redisStringReadWriteService.delete(key);
            // 释放线程id
            threadLocal.remove(); // 防止线程复用，释放锁
        }
    }

    /**
     * 通过线程id获得线程
     *
     * @param threadId 线程id
     * @return
     */
    private Thread findThread(long threadId) {
        ThreadGroup group = Thread.currentThread().getThreadGroup();
        while (group != null) {
            Thread[] threads = new Thread[(int) (group.activeCount() * 1.2)];
            int count = group.enumerate(threads, true);
            for (int i = 0; i < count; i++) {
                if (threadId == threads[i].getId()) {
                    return threads[i];
                }
            }
            group = group.getParent();
        }
        return null;
    }

    /**
     * TODO 终止当前未获取锁线程（延长持有锁时间线程）
     */
    private void stopThread() {
        // 获取当前线程自定义唯一uuid
        String dieUuid = threadLocal.get();
        if (!StringUtils.isEmpty(dieUuid)) {
            String[] split = dieUuid.split(":");
            // 查找当前线程
            Thread thread = findThread(Long.parseLong(split[0]));
            // 停止当前线程
            if (null != thread) {
                thread.interrupt();
            }
            // 释放线程id
            threadLocal.remove();
        }

    }
}

```