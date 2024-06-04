import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DuskSensor from '../steps/DuskSensor';
import Effect3D from '../steps/Effect3D';
import FastProduction from '../steps/FastProduction';
import Project from '../steps/Project';
import Led from '../steps/Led';
import Preview from '../steps/Preview';
import Thickness from '../steps/Thickness';
import Size from '../steps/Size';
import Lighting from '../steps/Lighting';
import Color from '../steps/Color';
import { productsData } from '../productsData';

const Product = () => {
  let stepNumber = 2;
  const calcStepNumber = () => stepNumber++;

  const dispatch = useDispatch();

  const app = useSelector((state) => state.app);

  const [currentProduct] = useState(productsData.find((el) => el.name === app.currentProduct));

  return (
    <>
      <Size stepNumber={calcStepNumber()} />
      <Thickness stepNumber={calcStepNumber()} options={[12]} />
      <Color
        stepNumber={calcStepNumber()}
        currentProduct={currentProduct}
        descriptionPart="Dostępne 4 kolory dibondu (biały, czarny, antracyt i aluminium szczotkowane), a także nadruk w technologii UV (CMYK+biały) lub oklejenie folią zadrukowaną w przestrzeni CMYK bądź fabrycznie barwioną folią polimerową (do wyboru ze wzornika)."
      />
      <Lighting
        stepNumber={calcStepNumber()}
        currentProduct={currentProduct}
        description="Standardowo stosujemy pleksę opal, jeżeli kolor świecenia ma być biały. Możliwa jest zmiana koloru świecenia za pomocą folii translucentnej Oracal 8500 (do wyboru ze wzornika)."
      />
      <Preview stepNumber={calcStepNumber()} />
      <Led stepNumber={calcStepNumber()} />
      <DuskSensor stepNumber={calcStepNumber()} />
      <Effect3D stepNumber={calcStepNumber()} />
      <FastProduction currentProduct={currentProduct} stepNumber={calcStepNumber()} />
      <Project stepNumber={calcStepNumber()} />
    </>
  );
};

export default Product;
