import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Placeholder from './features/Placeholder';
import BizRoot from './features/biz/BizRoot';
import BookPage from './features/book/BookPage';
import HomePage from './features/home/HomePage';

// שלושה אזורים + לינק אישי לעסק (החלטה 19). המסכים עצמם נבנים באבני הדרך 2–7.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/biz/*" element={<BizRoot />} />
        <Route path="/admin/*" element={<Placeholder title="אדמין" note="אבן דרך 7" />} />
        <Route path="/b/:slug" element={<BookPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
