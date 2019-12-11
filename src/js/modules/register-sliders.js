import Slider from '../classes/slider';

const registerSliders = () => {
  const sliders = document.querySelectorAll('.kva-widget'); 
  for (let i = 0; i < sliders.length; i++) {
    const element = sliders[i];
    const slider = new Slider(element);
    slider.run()
  }
}

export default registerSliders;
