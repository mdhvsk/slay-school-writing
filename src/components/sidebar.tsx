// import React, { useState, useEffect, useRef } from 'react';

// const HoverSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const triggerAreaRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const triggerWidth = window.innerWidth * 0.1; // 10% of screen width
//       if (e.clientX <= triggerWidth) {
//         setIsOpen(true);
//       }
//     };

//     const handleMouseLeave = () => {
//       setIsOpen(false);
//     };

//     const triggerArea = triggerAreaRef.current;
//     const sidebar = sidebarRef.current;

//     triggerArea.addEventListener('mousemove', handleMouseMove);
//     sidebar.addEventListener('mouseleave', handleMouseLeave);

//     return () => {
//       triggerArea.removeEventListener('mousemove', handleMouseMove);
//       sidebar.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, []);

//   return (
//     <div className="relative h-screen">
//       {/* Trigger area */}
//       <div
//         ref={triggerAreaRef}
//         className="absolute left-0 top-0 w-[10%] h-full z-10"
//       />

//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <h2 className="text-xl font-bold mb-4">Sidebar</h2>
//       </div>
//     </div>
//   );
// };

// export default HoverSidebar;