window.addEventListener('load', () => {
    if (localStorage.getItem('showElement') === 'false')
        return;

    const time = 5000;
    const info = [
        'Have you chosen a diet for yourself?',
        'The ideal diet contains zero meat and zero cholesterol.',
        'I only fear danger where I want to fear it.',
        'People think they\'re fine if they eat a diet that\'s 30 per cent calories from fat.',
        'Vegetarian diet reduces the risk of heart cancer, helps control diabetes, treats obesity and is kind to animals. It\'s an easy choice to make.',];
    const element = document.querySelector('.element');
    const closeButton = element.querySelector('.element_close');
    const pointsContainer = element.querySelector('.element_transition-points');
    const [leftArrow, rightArrow] = element.querySelectorAll('.element_arrow');
    const slideContent = element.querySelector('.element_slide-content > p');
    const disableTips = document.getElementById('disableTips');
    const points = [];
    let currSlide = 0;
    let wrapped = false;
    slideContent.textContent = info[0];

    closeButton.addEventListener('click', hideElement);

    function addPoint(pointIndex) {
        const point = document.createElement('span');
        point.addEventListener('click', () => {
            slideContent.textContent = info[pointIndex];
            currSlide = pointIndex;
            setSlide(pointIndex);
        });
        pointsContainer.appendChild(point);
        return point;
    }

    function showElement() {
        element.classList.remove('element_hidden');
        for (let i = 0; i < info.length; i++)
            points.push(addPoint(i));
        points[0].classList.add('element_transition-point_active');
        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'Escape':
                    hideElement();
                    break;
                case 'ArrowLeft':
                    previousSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
            }
        });
    }

    function hideElement() {
        element.classList.add('element_hidden');
    }

    function setSlide(slideIndex) {
        slideContent.textContent = info[slideIndex];
        points.forEach((point) => point.classList.remove('element_transition-point_active'));
        points[slideIndex].classList.add('element_transition-point_active');
    }

    function nextSlide() {
        currSlide = ++currSlide % info.length;
        setSlide(currSlide);
    }

    function previousSlide() {
        currSlide = currSlide - 1 < 0 ? info.length - 1 : currSlide - 1;
        setSlide(currSlide);
    }

    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', previousSlide);
    disableTips.addEventListener('click', function () {
        localStorage.setItem('showElement', !this.checked);
    });
    setTimeout(showElement, time);
});
