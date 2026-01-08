import { AlignJustify, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { resetTokenAndCredentials } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDemo = useSelector((state) => state.auth.user?.isDemo);
  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate('/auth/login');
  }
  return (
    <header className="flex items-center justify-between  px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        {/* <span className="sr-only">Toggle menu</span> */}
      </Button>
      <div className="flex flex-1 justify-end">
        {isDemo ? (
          <div className="mr-4 inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded">
            Demo (read-only)
          </div>
        ) : null}
      </div>
      <Button
        className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        onClick={handleLogout}
      >
        <LogOut />
        Logout
      </Button>
    </header>
  );
}

export default AdminHeader;
