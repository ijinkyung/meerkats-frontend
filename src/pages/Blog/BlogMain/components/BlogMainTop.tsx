import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import { warningAlert } from '../../../../components/Alert/Modal';

export default function BlogMainTop() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  const tabClickHandler = (id: number, title: string) => {
    setActiveTab(id);
  };

  const isUser = () => {
    const token = sessionStorage.getItem('token');
    if (token === null) {
      warningAlert(
        '로그인 해주세요!',
        '미어캐츠 회원만 블로그 글쓰기를 이용하실 수 있습니다.'
      );
      navigate('/login');
    }

    token && navigate('/post');
  };

  return (
    <div className="blog_top flex justify-between">
      <div className="blog_top_left flex items-center text-xl">
        {TAB_DATA.map(({ id, title }) => {
          return (
            <div
              key={id}
              className={`tab w-48 h-14 mr-8 text-xl font-semibold rounded-lg hover:border-4 hover:border-solid hover:border-mkGray ${
                activeTab === id
                  ? 'bg-white border-4 border-solid border-mkOrange hover:border-mkOrange rounded-lg text-black h-14'
                  : ''
              }`}
              onClick={() => {
                tabClickHandler(id, title);
              }}
            >
              {title}
            </div>
          );
        })}
      </div>
      <div className="blog_top_right flex items-center">
        <Search />
        <button
          className="btn w-28 text-xl rounded-lg text-white bg-mkOrange hover:bg-mkDarkOrange border-none"
          onClick={isUser}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
}

const TAB_DATA = [
  {
    id: 1,
    title: 'Trending',
  },
  {
    id: 2,
    title: 'My blog',
  },
];