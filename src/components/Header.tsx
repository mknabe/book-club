import { BookOutlined } from "@ant-design/icons";
import { Switch } from "antd";

const Header = ({ darkMode, onToggleDarkMode }: { darkMode: boolean; onToggleDarkMode: () => void }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h1 style={{ fontSize: 20, padding: "10px 16px", lineHeight: "32px", margin: 0 }}>
        <span style={{ marginRight: 12 }}>
          <a style={{ color: "inherit", textDecoration: "inherit" }} href="/book-club"><BookOutlined /> Book Club</a>
        </span>
        <span className="header-subtitle">
          Alive and kicking since 2015
        </span>
      </h1>
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        <Switch checked={darkMode} onChange={onToggleDarkMode} checkedChildren="🌙" unCheckedChildren="☀️" />
      </div>
    </div>
  );
};

export default Header;
