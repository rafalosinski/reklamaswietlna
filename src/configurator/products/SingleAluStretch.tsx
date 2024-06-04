import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DuskSensor from '../steps/DuskSensor';
import FastProduction from '../steps/FastProduction';
import Project from '../steps/Project';
import Led from '../steps/Led';
import Thickness from '../steps/Thickness';
import Size from '../steps/Size';
import Color from '../steps/Color';
import Printing from '../steps/Printing';
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
      <Thickness stepNumber={calcStepNumber()} options={[14]} />
      <Color
        stepNumber={calcStepNumber()}
        currentProduct={currentProduct}
        descriptionPart="W standardzie rama z surowego aluminium. Możliwe jest lakierowanie proszkowe dowolnym kolorem z palety RAL lub oklejenie folią zadrukowaną w przestrzeni CMYK bądź fabrycznie barwioną folią polimerową (do wyboru ze wzornika)."
      />
      <Printing
        stepNumber={calcStepNumber()}
        description="Zadruk w technologii UV 3 warstw (kolor-biały-kolor) tkaniny winylowej dedykowanej do podświetleń czyli frontowej, świecącej w całości, części kasetonu."
      />
      <Led stepNumber={calcStepNumber()} />
      <DuskSensor stepNumber={calcStepNumber()} />
      <FastProduction currentProduct={currentProduct} stepNumber={calcStepNumber()} />
      <Project stepNumber={calcStepNumber()} />
    </>
  );
};

export default Product;
