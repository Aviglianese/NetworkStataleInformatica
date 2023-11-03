import { 
  FontSizes, 
  Text,
  FontWeights, 
  ITextStyles, 
  Link, 
  useTheme 
} from '@fluentui/react';
import Image from 'next/image';
import { CSSProperties, useContext } from 'react';
import HeaderMenu from './HeaderMenu';
import Headroom from 'react-headroom';
import GlobalContext from 'services/GlobalContext';

const Header = () => {
  var theme = useTheme();

  const { setIsHeaderPinned } = useContext(GlobalContext);

  const headerZIndex = 2;

  const logoFileName = 'unimi150.png';

  const headerStyle: CSSProperties = {
    zIndex: headerZIndex,
    backgroundColor: theme.palette.white,
    borderBottom: '1px solid',
    borderColor: theme.palette.neutralQuaternary,
    marginBottom: -1
  };

  const titleStyle: ITextStyles = {
    root: {
      fontSize: FontSizes.size20,
      fontWeight: FontWeights.semibold,
      color: theme.palette.themePrimary
    }
  };

  const onHeaderPin = () => setIsHeaderPinned(true);
  const onHeaderUnpin = () => setIsHeaderPinned(false);

  return (
    <>
      {/* @ts-ignore */} 
      <Headroom style={{ zIndex: headerZIndex }} onPin={onHeaderPin} onUnpin={onHeaderUnpin}>
        <header style={headerStyle} className="header">

          <div className="d-flex flex-row" style={{ marginRight: 15, marginLeft: 15, marginBottom: 0 }}>

            <div style={{ maxWidth: 250, paddingLeft: 0, paddingRight: 0, display: 'flex', alignItems: 'center' }}>
              <div className="d-flex align-items-center" style={{ width: 250, gap: 10 }}>
                <Link href="/" className='d-flex align-items-center' style={{ marginTop: 3 }}>
                  <Image
                    id="logo"
                    alt="Logo"
                    src={'/logo/' + logoFileName}
                    width={25}
                    height={25} 
                  />
                </Link>

                <Link href="/" className="text-decoration-none">
                  <Text styles={titleStyle}>Network StudentiUniMi</Text>
                </Link>
              </div>
            </div>

            <div style={{ paddingLeft: 0, paddingRight: 0, flexGrow: 1, overflowX: 'hidden', overflowY: 'hidden' }}>
              <HeaderMenu />
            </div>

          </div>

        </header>
      </Headroom>
    </>
  )
};

export default Header;