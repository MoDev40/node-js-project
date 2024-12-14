import { Route, Routes } from 'react-router-dom'
import BottomNavBar from './components/BottomNavBar'
import SignUp from './components/SignUp'
import BlogArticlePage from './pages/BlogArticlePage'
import BlogsPage from './pages/BlogsPage'
import ContactPage from './pages/ContactPage'
import CreateBlogPostPage from './pages/CreateBlogPostPage'
import EditBlogPage from './pages/EditBlogPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<BlogsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="create/blog-post" element={<CreateBlogPostPage />} />
          <Route path="edit/blog-post/:id" element={<EditBlogPage />} />
          <Route path="blog/article/:id" element={<BlogArticlePage />} />
      </Routes>     
      <BottomNavBar/>
    </div>
  )
}

export default App