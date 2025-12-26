import RightArrow from '../../../assets/RightArrow.svg';
import { Dropdown } from '../../index';

const ButtonCallToAction = ({
<<<<<<< HEAD
  content = "Get Started",
  textStyling = "text-sm sm:text-xl",
  horizontalMargin = "px-[10px] sm:mx-[30px]",
  handlClick,
  type = "button",
=======
  content = 'Get Started',
  textStyling = 'text-sm sm:text-xl',
  horizontalMargin = 'px-[10px] sm:mx-[30px]',
  handleClick,
>>>>>>> 46226548cb6aa7b9622231eff06e265da20a7a45
}) => {
  return (
    <div id='get-started' className='place-content-center  '>
      <button
<<<<<<< HEAD
        type={type}
        className={`bg-purple-500 inline-flex items-center justify-center  text-white py-2.5 rounded-[25px] sm:rounded-[50px] sm:px-7.5 px-5.5  ${textStyling} hover:cursor-pointer hover:bg-purple-600`}
        onClick={handlClick}
=======
        className={`bg-purple-500 text-nowrap inline-flex items-center justify-center  text-white py-2.5 rounded-[25px] sm:rounded-[50px] sm:px-7.5 px-5.5  ${textStyling} hover:cursor-pointer hover:bg-purple-600`}
        onClick={handleClick}
>>>>>>> 46226548cb6aa7b9622231eff06e265da20a7a45
      >
        <span className={`${horizontalMargin} font-semibold`}>{content}</span>
        <div className='rounded-full p-1.5 w-[25px] h-[25px]  sm:w-[35px] sm:h-[34px] bg-white place-content-center'>
          <img className='mx-auto ' src={RightArrow} alt='right-arrow-icon' />
        </div>
      </button>
    </div>
  );
};

export default ButtonCallToAction;
