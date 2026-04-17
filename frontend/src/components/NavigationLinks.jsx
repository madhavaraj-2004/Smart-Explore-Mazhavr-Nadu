import { NavLink, useLocation } from 'react-router-dom';

const isPublicPath = (path) => path === '/';

const NavigationLinks = ({
  links,
  districtLinks = [],
  variant = 'desktop',
  onNavigate,
  isAuthenticated = false,
  onRequireAuth,
}) => {
  const location = useLocation();
  const districtActive = districtLinks.some((item) => location.pathname === item.to);

  if (variant === 'mobile') {
    return (
      <nav className="sidebar-links" aria-label="Mobile primary navigation">
        {links.map((link) => (
          isAuthenticated || isPublicPath(link.to) ? (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `sidebar-link${isActive ? ' sidebar-link-active' : ''}`}
              onClick={onNavigate}
            >
              {link.label}
            </NavLink>
          ) : (
            <button
              key={link.to}
              type="button"
              className="sidebar-link sidebar-link-disabled"
              onClick={onRequireAuth}
            >
              {link.label}
            </button>
          )
        ))}

        {districtLinks.length ? <p className="sidebar-group-title">District</p> : null}
        {districtLinks.map((district) => (
          isAuthenticated ? (
            <NavLink
              key={district.to}
              to={district.to}
              className={({ isActive }) => `sidebar-link sidebar-district-link${isActive ? ' sidebar-link-active' : ''}`}
              onClick={onNavigate}
            >
              {district.label}
            </NavLink>
          ) : (
            <button
              key={district.to}
              type="button"
              className="sidebar-link sidebar-district-link sidebar-link-disabled"
              onClick={onRequireAuth}
            >
              {district.label}
            </button>
          )
        ))}
      </nav>
    );
  }

  return (
    <nav className="desktop-links" aria-label="Primary navigation">
      {links.map((link) => (
        isAuthenticated || isPublicPath(link.to) ? (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
          >
            {link.label}
          </NavLink>
        ) : (
          <button key={link.to} type="button" className="nav-link nav-link-disabled" onClick={onRequireAuth}>
            {link.label}
          </button>
        )
      ))}

      {districtLinks.length ? (
        <div className="district-menu-wrap">
          <button
            type="button"
            className={`nav-link district-menu-trigger${districtActive ? ' nav-link-active' : ''}${isAuthenticated ? '' : ' nav-link-disabled'}`}
            aria-label="District links"
            onClick={!isAuthenticated ? onRequireAuth : undefined}
          >
            District
          </button>
          <div className="district-menu" role="menu" aria-label="District links menu">
            {districtLinks.map((district) => (
              isAuthenticated ? (
                <NavLink
                  key={district.to}
                  to={district.to}
                  className={({ isActive }) => `district-menu-link${isActive ? ' district-menu-link-active' : ''}`}
                >
                  {district.label}
                </NavLink>
              ) : (
                <button
                  key={district.to}
                  type="button"
                  className="district-menu-link district-menu-link-disabled"
                  onClick={onRequireAuth}
                >
                  {district.label}
                </button>
              )
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default NavigationLinks;