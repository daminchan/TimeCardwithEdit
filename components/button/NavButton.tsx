import Link from 'next/link';

import CustomButton from '../button/CustomButton';

interface NavButtonProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ href, onClick, children }) => {
  return (
    <Link href={href} passHref>
      <CustomButton onClick={onClick} width="150px">
        {children}
      </CustomButton>
    </Link>
  );
};

export default NavButton;
