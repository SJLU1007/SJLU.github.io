document.getElementById('openContact').onclick = function() {
    document.getElementById('contact').style.display = 'block';
}
// 为上传按钮添加点击事件
document.getElementById('sendBtn').addEventListener('click', function() {
    // 获取表单输入值
    const name = document.querySelector('.contact input[type="text"]').value;
    const fileInput = document.querySelector('.contact input[type="file"]');
    const file = fileInput ? fileInput.files[0] : null;
    if (!name || !file) {
        console.log('请填写完整信息并选择图片！');
        return;
    }
    // 动态添加图片到精选照片区
    const reader = new FileReader();
    reader.onload = function(e) {
        const photosContainer = document.querySelector('.photos');
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo';
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = name || '用户上传图片';
        const p = document.createElement('p');
        p.textContent = name ? `${name} ` : '用户上传图片';
        photoDiv.appendChild(img);
        photoDiv.appendChild(p);
        photosContainer.appendChild(photoDiv);
    };
    reader.readAsDataURL(file);
    // 清空表单
    document.querySelector('.contact form').reset();
});
document.getElementById('closeContact').onclick = function() {
    document.getElementById('contact').style.display = 'none';
};



