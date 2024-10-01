"use client";
import React, { useState } from 'react';

const TabComponent = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Token Detector'); // Tab mặc định là 'Token Detector'

  // Danh sách các tab, có thể chỉnh sửa tên hoặc thêm tab mới
  const tabs = [
    { name: 'Token Detector', id: 'token-detector' },
    { name: 'General Detector', id: 'general-detector' }
  ];

  // Hàm xử lý khi nhấn vào tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Cập nhật tab đang được chọn
    onTabChange(tabName);  // Gọi hàm onTabChange để thông báo cho component cha
  };

  return (
    <div style={styles.outerContainer}>
      {/* Vùng chứa các tab */}
      <div style={styles.tabContainer}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.name)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.name ? styles.activeTab : styles.inactiveTab)
            }}
          >
            {tab.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles - Chỉnh sửa giao diện
const styles = {
  outerContainer: {
    backgroundColor: 'white', // Màu nền của container chính
    padding: '10px', // Khoảng cách bên trong container
    borderRadius: '10px', // Bo góc container
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Đổ bóng
    margin: '0 ', // Căn giữa container
    width: '100%',  // Chiều rộng toàn bộ container
    maxWidth: '500px', // Chiều rộng tối đa của container
  },
  tabContainer: {
    display: 'flex', // Sắp xếp các tab theo hàng ngang
    justifyContent: 'space-between', // Căn đều các tab
    width: '100%',  // Đảm bảo chiều rộng đầy đủ cho container chứa tab
  },
  tab: {
    padding: '15px 30px', // Điều chỉnh kích thước tab (có thể thay đổi giá trị để tăng/giảm kích thước)
    textAlign: 'center', // Căn giữa văn bản bên trong tab
    borderRadius: '5px', // Bo góc tab
    cursor: 'pointer', // Thêm con trỏ khi hover
    transition: 'opacity 0.3s ease', // Hiệu ứng chuyển đổi opacity
    fontWeight: 'bold', // Văn bản in đậm
    flexGrow: 1, // Đảm bảo các tab chia đều không gian
    whiteSpace: 'nowrap', // Ngăn chặn text xuống dòng
  },
  activeTab: {
    backgroundColor: 'red', // Màu nền của tab đang chọn
    color: 'white', // Màu chữ của tab đang chọn
    opacity: 1, // Độ trong suốt của tab đang chọn (có thể chỉnh)
  },
  inactiveTab: {
    backgroundColor: 'white', // Màu nền của tab chưa được chọn
    color: 'black', // Màu chữ của tab chưa được chọn
    opacity: 0.5, // Độ trong suốt của tab chưa được chọn (có thể chỉnh)
  }
};

export default TabComponent;
