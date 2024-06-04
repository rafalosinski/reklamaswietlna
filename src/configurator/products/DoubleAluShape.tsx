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
import Shape from '../steps/Shape';
import TapeType from '../steps/TapeType';
import Override from '../steps/Override';
import Effect3D from '../steps/Effect3D';
import { productsData } from '../productsData';

const Product = () => {
  let stepNumber = 2;
  const calcStepNumber = () => stepNumber++;

  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  const app = useSelector((state) => state.app);

  const [currentProduct] = useState(productsData.find((el) => el.name === app.currentProduct));

  return (
    <>
      <Shape stepNumber={calcStepNumber()} />
      <Size
        stepNumber={calcStepNumber()}
        descriptionPart=" Koło i Krzyż są na planie kwadratu (wysokość taka sama jak szerokość)."
      />
      <Thickness stepNumber={calcStepNumber()} options={[12, 16]} />
      <Color
        stepNumber={calcStepNumber()}
        currentProduct={currentProduct}
        descriptionPart="Dostępnych jest wyłącznie 12 fabrycznych kolorów taśm: 8 będących odpowiednikami 8 kolorów RAL oraz złote i srebrne w dwóch wariantach - wybierz odpowiedni wzornik."
      />
      <TapeType currentProduct={currentProduct} stepNumber={calcStepNumber()} />
      <Printing
        stepNumber={calcStepNumber()}
        description="Zadruk w technologii UV 3 warstw (kolor-biały-kolor) pleksy opal czyli frontowej, świecącej w całości, części kasetonu."
      />
      <Led stepNumber={calcStepNumber()} />
      <Override stepNumber={calcStepNumber()} />
      <Effect3D stepNumber={calcStepNumber()} />
      <DuskSensor stepNumber={calcStepNumber()} />
      <FastProduction currentProduct={currentProduct} stepNumber={calcStepNumber()} />
      <Project stepNumber={calcStepNumber()} />
    </>
  );
};

export default Product;
