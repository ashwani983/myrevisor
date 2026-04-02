import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Study } from '@/pages/Study';
import { Quiz } from '@/pages/Quiz';
import { Chat } from '@/pages/Chat';
import { Settings } from '@/pages/Settings';
import { ProgressPage } from '@/pages/Progress';
import { Profile } from '@/pages/Profile';
import { About } from '@/pages/About';
import { Terms } from '@/pages/Terms';
import { Copyright } from '@/pages/Copyright';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="study" element={<Study />} />
          <Route path="study/:subjectId" element={<Study />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} />
          <Route path="copyright" element={<Copyright />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
