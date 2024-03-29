import { useEffect, useState } from 'react';
import SneakersItem from '../components/SneakersItem';
import SneakersSkeleton from '../components/SneakersSkeleton';
import slide1 from '../UI/Slider/slide1.jpg';
import slide2 from '../UI/Slider/slide2.jpg';
import Slider from '../UI/Slider';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { fetchSneakersCount } from '../redux/slices/pagination';
import { fetchSneakers, setPage } from '../redux/slices/sneakers';
import { filtersDefaultState } from '../redux/slices/filters';

const Main: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showPagination, setShowPagination] = useState(true);

  const { currentPage, sneakersPerPage } = useTypedSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(setPage('main'));
    dispatch(fetchSneakersCount());
    dispatch(fetchSneakers());
  }, [dispatch]);

  const { sneakers, loading } = useTypedSelector((state) => state.sneakers);
  const filters = useTypedSelector((state) => state.filters);
  const { search } = filters;

  useEffect(() => {
    dispatch(fetchSneakers());
    const { brands, sale, search, sortBy, sortField } = filters;
    if (
      brands.length !== filtersDefaultState.brands.length ||
      sale !== filtersDefaultState.sale ||
      search !== filtersDefaultState.search ||
      sortBy !== filtersDefaultState.sortBy ||
      sortField !== filtersDefaultState.sortField
    ) {
      setShowPagination(false);
    } else {
      setShowPagination(true);
    }
  }, [filters, dispatch, currentPage]);

  return (
    <>
      <Slider>
        <img src={slide1} alt="slide1" />
        <img src={slide2} alt="slide2" />
      </Slider>
      <div className="sneakers">
        <div className="sneakers__container">
          <div className="sneakers__container-left">
            <div className="sneakers__top">
              {search ? <h1>Поиск по запросу: {search}</h1> : <h1>Все кроссовки</h1>}
              {showPagination && <Pagination />}
            </div>
            <div className="sneakers__wrapper">
              <div className="sneakers__list">
                {loading
                  ? [...Array(sneakersPerPage)].map((_, index) => <SneakersSkeleton key={index} />)
                  : sneakers
                  ? sneakers.map((sneaker) => <SneakersItem key={sneaker.id} sneaker={sneaker} />)
                  : 'Нет кроссовок'}
              </div>
            </div>
          </div>
          <div className="sneaker__container-right">
            {/* <Search /> */}
            <Filters />
          </div>

          <div className="sneakers__pagination">{showPagination && <Pagination />}</div>
        </div>
      </div>
    </>
  );
};

export default Main;
