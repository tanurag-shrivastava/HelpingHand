document.querySelectorAll('.footer-section ul li').forEach(item => {
    item.addEventListener('mouseover', () => {
      item.style.color = '#00ffff';
    });
    item.addEventListener('mouseout', () => {
      item.style.color = '#ffffff';
    });
  });
  