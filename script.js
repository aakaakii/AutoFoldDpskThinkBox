// ==UserScript==
// @name         隐藏 deepseek 思考框
// @namespace    http://tampermonkey.net/
// @version      114.514
// @description  自动隐藏所有class为"e1675d8b ds-think-content _767406f"的div
// @author       https://github.com/Badcenyyds
// @match        *://chat.deepseek.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 要隐藏的元素选择器（匹配同时拥有这三个class的div）
    const selector = 'div.e1675d8b.ds-think-content._767406f';

    // 隐藏匹配元素
    function hideElements() {
        document.querySelectorAll(selector).forEach(el => {
            el.style.display = 'none';
        });
    }

    // 初次运行：隐藏已存在的元素
    hideElements();

    // 监听DOM变化，隐藏后续动态添加的元素
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // 检查新增的节点本身
                    if (node.matches && node.matches(selector)) {
                        node.style.display = 'none';
                    }
                    // 检查新增节点的后代
                    if (node.querySelectorAll) {
                        node.querySelectorAll(selector).forEach(el => {
                            el.style.display = 'none';
                        });
                    }
                }
            });
        });
    });

    // 开始观察整个文档
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();