import './Home.css';
import '../components/MovieRow';
import MovieRow from '../components/MovieRow';
import MovieAd from '../components/MovieAd';


function Home() {
    
    return (
        <div class="home-page">
            <MovieAd></MovieAd>
            <MovieRow></MovieRow>
        </div>

    );
}

export default Home;