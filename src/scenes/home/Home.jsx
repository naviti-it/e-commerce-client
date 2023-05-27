import MainCarousel from './MainCarousel'
import ShopingList from './ShopingList'
import Subscribe from './Subscribe'

const Home = () => {
    return <div className='home'>
        <MainCarousel />
        <ShopingList />
        <Subscribe />
    </div>
}

export default Home;