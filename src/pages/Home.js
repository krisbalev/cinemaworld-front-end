import './Home.css';
import '../components/MovieRow';
import MovieRow from '../components/MovieRow';
import MovieSlider from '../components/MovieSlider';


function Home() {
    
    return (
        <div class="home-page">
            <MovieSlider/>
            <MovieRow/>
        </div>

    );
}

export default Home;