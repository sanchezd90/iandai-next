import { Player } from '@lottiefiles/react-lottie-player';
import Loading from '../../../public/resources/loading.json'

export const LoadingAnimation = () => {
  return (  
    <Player
        src={Loading}
        autoplay
        loop
        style={{width:'12rem'}}
    />  
    )
};
