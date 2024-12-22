"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowTrendingUpIcon,
  Cog6ToothIcon,
  UsersIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

const NavigationBar = () => {
  const { id } = useParams(); // Lấy campaign ID từ URL
  const [path, setPath] = useState('');
 // Đảm bảo chỉ gọi window khi ứng dụng đã được render trên client-side
 useEffect(() => {
  if (typeof window !== 'undefined') {
    setPath(window.location.pathname); // Lấy đường dẫn hiện tại
  }
}, []); // Chỉ chạy một lần khi component được mount trên client
  // Xác định các mục menu với tên và icon tương ứng
  const items = [
    { label: 'Tổng quan', icon: ArrowTrendingUpIcon },
    { label: 'Cấu Hình', icon: Cog6ToothIcon },
    { label: 'Liên hệ', icon: UsersIcon },
    { label: 'Xác thực email', icon: EnvelopeIcon },
  ];

  // Kiểm tra nếu trang hiện tại có chứa 'subscribers', 'edit' hoặc 'overview'
  const isSubscribersPage = path.includes('subscribers');
  const isEditPage = path.includes('edit');
  const isOverviewPage = path.includes('overview'); // Kiểm tra nếu là trang 'Tổng quan'

  return (
    <div className="flex justify-between space-x-2 w-full">
      {items.map((item, index) => {
        const linkPath = `/lists/${id}/${item.label.toLowerCase().replace(/\s/g, '-')}`;
        const IconComponent = item.icon; // Lấy component icon tương ứng

        // Xử lý điều kiện làm sáng icon
        const isActive =
          (item.label === 'Liên hệ' && isSubscribersPage) ||
          (item.label === 'Cấu Hình' && isEditPage) ||
          (item.label === 'Tổng quan' && isOverviewPage); // Thêm điều kiện cho trang 'Tổng quan'

        return (
          <Link
            key={index}
            href={linkPath}
            className={`flex flex-1 items-center space-x-2 text-gray-600 focus:outline-none ${
              isActive ? 'text-teal-500' : 'hover:text-teal-500' // Làm sáng icon nếu là trang hiện tại
            }`}
          >
            {/* Render trực tiếp IconComponent */}
            <IconComponent className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationBar;
