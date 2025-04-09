// 页面初始化和导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 根据当前页面初始化相应功能
    const currentPage = window.location.pathname.split('/').pop();
    
    // 初始化导航
    initNavigation();
    
    // 根据当前页面执行对应的初始化
    if (currentPage === 'index.html' || currentPage === '') {
        initHomePage();
    } else if (currentPage === 'reader-selection.html') {
        initReaderSelection();
    } else if (currentPage === 'readers.html') {
        initReadersPage();
    } else if (currentPage === 'about.html') {
        initAboutPage();
    } else if (currentPage === 'step2.html') {
        initReaderSelection();
    } else if (currentPage === 'step3.html') {
        initQuestionPage();
    } else if (currentPage === 'step4.html') {
        initLayoutSelectionPage();
    } else if (currentPage === 'step5.html') {
        initCardDrawingPage();
    } else if (currentPage === 'step6.html') {
        initResultsPage();
    }
});

// 获取当前页面文件名
function getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
}

// 导航初始化
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 可以在这里添加导航相关的逻辑
            console.log(`正在导航到: ${this.getAttribute('href')}`);
        });
    });
}

// 首页初始化
function initHomePage() {
    console.log('首页已初始化');
    const heroButton = document.querySelector('.hero-content .btn');
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            window.location.href = 'reader-selection.html';
        });
    }
}

// 读者选择页面初始化
function initReaderSelection() {
    console.log('读者选择页面已初始化');
    const readerCards = document.querySelectorAll('.reader-card');
    const continueBtn = document.getElementById('continue-btn');
    
    // 只添加一次继续按钮的点击事件
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            if (!this.disabled) {
                // 跳转到下一步
                window.location.href = 'step3.html';
            }
        });
    }
    
    if (readerCards.length > 0) {
        readerCards.forEach(card => {
            card.addEventListener('click', function() {
                // 移除其他卡片的选中状态
                readerCards.forEach(c => c.classList.remove('border-purple-500', 'border-2'));
                
                // 添加当前卡片的选中状态
                this.classList.add('border-purple-500', 'border-2');
                
                // 获取读者信息
                const readerId = this.getAttribute('data-reader-id');
                const readerName = this.querySelector('h3').textContent;
                
                // 保存选择的读者信息到本地存储
                localStorage.setItem('selectedReaderId', readerId);
                localStorage.setItem('selectedReaderName', readerName);
                
                // 启用继续按钮
                if (continueBtn) {
                    continueBtn.disabled = false;
                    continueBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    continueBtn.classList.add('hover:bg-purple-700');
                }
            });
        });
    }
}

// 读者详情页面初始化
function initReadersPage() {
    console.log('读者详情页面已初始化');
    // 获取URL参数中的读者ID
    const urlParams = new URLSearchParams(window.location.search);
    const readerId = urlParams.get('id');
    
    if (readerId) {
        // 在这里加载特定读者的信息
        console.log(`正在加载读者ID: ${readerId}`);
        loadReaderData(readerId);
    } else {
        console.error('未提供读者ID');
        // 可以重定向回选择页面
        // window.location.href = 'reader-selection.html';
    }
    
    // 初始化预约表单
    initBookingForm();
}

// 关于页面初始化
function initAboutPage() {
    console.log('关于页面已初始化');
    // 可以在这里添加关于页面的特定功能
}

// 加载读者数据
function loadReaderData(readerId) {
    // 模拟从服务器获取数据
    // 在实际应用中，这里应该是一个API调用
    const readerData = {
        // 假设数据
        1: { name: "Thomas Quinn", specialty: "塔罗牌专家", experience: "15年", img: "images/reader1.jpg" },
        2: { name: "Isabella Vega", specialty: "占星术大师", experience: "20年", img: "images/reader2.jpg" },
        3: { name: "Michael Chen", specialty: "灵气读者", experience: "10年", img: "images/reader3.jpg" }
    };
    
    const reader = readerData[readerId];
    if (reader) {
        // 更新页面上的读者信息
        document.getElementById('reader-name').textContent = reader.name;
        document.getElementById('reader-specialty').textContent = reader.specialty;
        document.getElementById('reader-experience').textContent = reader.experience;
        document.getElementById('reader-image').src = reader.img;
    }
}

// 初始化预约表单
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            // 简单验证
            if (!name || !email || !date || !time) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 在这里处理表单提交
            console.log('预约已提交:', { name, email, date, time });
            
            // 显示成功消息
            alert('您的预约已提交！我们将尽快与您联系确认。');
            bookingForm.reset();
        });
    }
}

// 问题输入页面初始化
function initQuestionPage() {
    const questionInput = document.getElementById('question-input');
    const charCount = document.getElementById('char-count');
    const continueBtn = document.getElementById('continue-btn');
    
    if (questionInput && charCount) {
        questionInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 300;
            
            // 更新字符计数
            charCount.textContent = `${currentLength}/${maxLength}`;
            
            // 限制输入长度
            if (currentLength > maxLength) {
                this.value = this.value.substring(0, maxLength);
                charCount.textContent = `${maxLength}/${maxLength}`;
            }
            
            // 启用或禁用继续按钮
            if (continueBtn) {
                if (currentLength > 10) {
                    continueBtn.disabled = false;
                    continueBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    continueBtn.classList.add('hover:bg-purple-700');
                } else {
                    continueBtn.disabled = true;
                    continueBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    continueBtn.classList.remove('hover:bg-purple-700');
                }
            }
        });
        
        // 提交按钮点击事件
        if (continueBtn) {
            continueBtn.addEventListener('click', function() {
                if (!this.disabled) {
                    // 保存问题到本地存储
                    localStorage.setItem('tarotQuestion', questionInput.value);
                    
                    // 跳转到下一页
                    window.location.href = 'step4.html';
                }
            });
        }
    }
}

// 牌阵选择页面初始化
function initLayoutSelectionPage() {
    const layoutOptions = document.querySelectorAll('.layout-option');
    
    if (layoutOptions.length > 0) {
        layoutOptions.forEach(option => {
            option.addEventListener('click', function() {
                // 移除其他选项的选中状态
                layoutOptions.forEach(o => o.classList.remove('border-purple-500', 'border-2'));
                
                // 添加当前选项的选中状态
                this.classList.add('border-purple-500', 'border-2');
                
                // 保存选择的牌阵信息
                const layoutId = this.getAttribute('data-layout-id');
                const layoutName = this.querySelector('h3').textContent;
                
                localStorage.setItem('selectedLayoutId', layoutId);
                localStorage.setItem('selectedLayoutName', layoutName);
                
                // 启用继续按钮
                const continueBtn = document.getElementById('continue-btn');
                if (continueBtn) {
                    continueBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    continueBtn.classList.add('hover:bg-purple-700');
                    continueBtn.disabled = false;
                }
            });
        });
    }
}

// 抽牌页面初始化
function initCardDrawingPage() {
    const cards = document.querySelectorAll('.tarot-card');
    const cardSlots = document.querySelectorAll('.card-slot');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const resetBtn = document.getElementById('reset-btn');
    const interpretBtn = document.getElementById('interpret-btn');
    const cardContainer = document.querySelector('.cards-container');
    
    // 存储选中的卡片
    let selectedCards = [];
    
    // 洗牌功能
    if (shuffleBtn && cardContainer) {
        shuffleBtn.addEventListener('click', function() {
            if (cards.length > 0) {
                // 添加洗牌动画
                cardContainer.classList.add('shuffling');
                
                // 延迟后移除动画并重新排列卡片
                setTimeout(() => {
                    cardContainer.classList.remove('shuffling');
                    
                    // 重新排列卡片顺序
                    const cardsArray = Array.from(cards);
                    cardsArray.sort(() => Math.random() - 0.5);
                    
                    cardsArray.forEach(card => {
                        cardContainer.appendChild(card);
                    });
                }, 1000);
            }
        });
    }
    
    // 重置功能
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // 清空已选卡片
            selectedCards = [];
            
            // 恢复所有卡槽
            cardSlots.forEach(slot => {
                slot.innerHTML = `<div class="h-40 w-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                    <span>放置卡片</span>
                </div>`;
                slot.classList.remove('filled');
            });
            
            // 恢复所有卡片可点击状态
            cards.forEach(card => {
                card.classList.remove('opacity-50');
                card.style.display = 'block';
            });
            
            // 禁用解读按钮
            if (interpretBtn) {
                interpretBtn.disabled = true;
                interpretBtn.classList.add('opacity-50', 'cursor-not-allowed');
                interpretBtn.classList.remove('hover:bg-purple-700');
            }
        });
    }
    
    // 卡片选择功能
    if (cards.length > 0 && cardSlots.length > 0) {
        cards.forEach(card => {
            card.addEventListener('click', function() {
                if (selectedCards.length < cardSlots.length) {
                    // 获取卡片信息
                    const cardId = this.getAttribute('data-card-id');
                    const cardName = this.getAttribute('data-card-name');
                    const cardImage = this.querySelector('img').src;
                    
                    // 添加到选中卡片数组
                    selectedCards.push({
                        id: cardId,
                        name: cardName,
                        image: cardImage
                    });
                    
                    // 将卡片放入卡槽
                    const currentSlot = cardSlots[selectedCards.length - 1];
                    currentSlot.innerHTML = `<img src="${cardImage}" alt="${cardName}" class="h-40 w-24 object-cover rounded-lg">`;
                    currentSlot.classList.add('filled');
                    
                    // 禁用该卡片的点击
                    this.classList.add('opacity-50');
                    this.style.display = 'none';
                    
                    // 如果选满了卡片，启用解读按钮
                    if (selectedCards.length === cardSlots.length) {
                        if (interpretBtn) {
                            interpretBtn.disabled = false;
                            interpretBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                            interpretBtn.classList.add('hover:bg-purple-700');
                            
                            // 保存选中的卡片到本地存储
                            localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
                        }
                    }
                }
            });
        });
    }
    
    // 解读按钮点击事件
    if (interpretBtn) {
        interpretBtn.addEventListener('click', function() {
            if (!this.disabled) {
                // 跳转到结果页面
                window.location.href = 'step6.html';
            }
        });
    }
}

// 结果页面初始化
function initResultsPage() {
    // 从URL或本地存储获取问题
    const question = localStorage.getItem('tarotQuestion') || '您的塔罗牌问题';
    const questionElem = document.getElementById('user-question');
    
    if (questionElem) {
        questionElem.textContent = question;
    }
    
    // 获取塔罗师信息
    const readerName = localStorage.getItem('selectedReaderName') || '塔罗大师';
    const readerElem = document.getElementById('reader-name');
    
    if (readerElem) {
        readerElem.textContent = readerName;
    }
    
    // 获取牌阵信息
    const layoutName = localStorage.getItem('selectedLayoutName') || '直指核心牌阵';
    const layoutElem = document.getElementById('layout-name');
    
    if (layoutElem) {
        layoutElem.textContent = layoutName;
    }
    
    // 展示选中的卡片
    const cardsContainer = document.getElementById('drawn-cards');
    const selectedCards = JSON.parse(localStorage.getItem('selectedCards') || '[]');
    
    if (cardsContainer && selectedCards.length > 0) {
        let cardsHTML = '';
        
        selectedCards.forEach((card, index) => {
            cardsHTML += `
            <div class="mb-8">
                <div class="flex items-center mb-2">
                    <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">位置 ${index + 1}</span>
                    <h3 class="text-lg font-semibold">${card.name}</h3>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <img src="${card.image}" alt="${card.name}" class="w-24 h-40 object-cover rounded-lg">
                    <div>
                        <p class="text-gray-700 mb-2">${getCardMeaning(card.id, index)}</p>
                    </div>
                </div>
            </div>`;
        });
        
        cardsContainer.innerHTML = cardsHTML;
    }
    
    // 分享功能
    const shareBtn = document.getElementById('share-btn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: '我的塔罗牌解读',
                    text: `我询问了关于"${question}"的问题，得到了塔罗的启示！`,
                    url: window.location.href
                });
            } else {
                // 复制链接到剪贴板
                const dummy = document.createElement('input');
                document.body.appendChild(dummy);
                dummy.value = window.location.href;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
                
                alert('链接已复制到剪贴板！');
            }
        });
    }
}

// 获取牌面含义
function getCardMeaning(cardId, position) {
    // 这里可以根据卡片ID和位置返回不同的解读
    const meanings = [
        '这张牌在当前位置表示您正面临一个重要的转折点。它象征着新的开始和无限可能性。信任您的直觉，勇敢前行。',
        '这张牌代表您内心深处的情感和潜意识。它提醒您倾听内心的声音，寻找情感上的平衡与和谐。',
        '在这个位置上，此牌象征着您面临的挑战和障碍。它建议您用智慧和耐心来克服困难，坚持不懈终会成功。',
        '这张牌反映了可能的结果或未来的发展方向。它预示着积极的变化和成长，只要您保持信心并付出努力。'
    ];
    
    return meanings[position] || '这张牌包含着深刻的信息，它提醒您关注生活中的微妙变化和内在感受。相信自己的判断力，答案就在您的内心。';
}

// 添加平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
}); 