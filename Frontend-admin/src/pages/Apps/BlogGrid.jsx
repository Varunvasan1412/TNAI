import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  PageTitle, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from '../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../lib/utils';

const blogs = [
  { id: 1, title: 'Beautiful Day with Friends', date: '10 Apr, 2022', image: '/assets/images/small/img-3.jpg', desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text, a Latin professor at Hampden-Sydney College.' },
  { id: 2, title: 'Drawing a sketch', date: '24 May, 2022', image: '/assets/images/small/img-2.jpg', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
  { id: 3, title: 'Project discussion with team', date: '12 June, 2022', image: '/assets/images/small/img-1.jpg', desc: 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words.' },
  { id: 4, title: 'Morning with Photoshoot', date: '10 July, 2022', image: '/assets/images/small/img-4.jpg', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
  { id: 5, title: 'Coffee with friends', date: '16 June, 2022', image: '/assets/images/small/img-3.jpg', desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text, a Latin professor at Hampden-Sydney College.' },
  { id: 6, title: 'Working day with our new ideas', date: '22 May, 2022', image: '/assets/images/small/img-5.jpg', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.' }
];

const BlogGrid = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Blog Grid" 
        breadcrumbs={[
          { label: 'Blog', path: '#' },
          { label: 'Blog Grid', active: true },
        ]} 
      />

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h5 className="text-lg font-bold text-gray-800 dark:text-white">
            Blog List <span className="text-gray-500 font-normal ml-2">(535)</span>
          </h5>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
            <Link 
              to="/apps-blog-list" 
              className="p-1.5 rounded-md text-gray-500 hover:text-primary transition-colors"
              title="List View"
            >
              <Feather.List className="w-4 h-4" />
            </Link>
            <Link 
              to="/apps-blog-grid" 
              className="p-1.5 rounded-md bg-white dark:bg-slate-700 text-primary shadow-sm"
              title="Grid View"
            >
              <Feather.Grid className="w-4 h-4" />
            </Link>
          </div>

          <Button variant="primary" size="sm" className="gap-2">
            <Feather.Plus className="w-4 h-4" />
            Add New
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative overflow-hidden aspect-video">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded text-[10px] font-bold text-primary shadow-sm">
                  {blog.date}
                </span>
              </div>
            </div>
            <CardBody className="p-6">
              <h5 className="text-base font-bold text-gray-800 dark:text-white mb-3 hover:text-primary transition-colors line-clamp-1">
                <Link to="#">{blog.title}</Link>
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-6 font-medium">
                {blog.desc}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                <Link to="#" className="text-xs font-bold text-primary flex items-center gap-1 group/btn">
                  Read More
                  <Feather.ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-2">
                   <button className="p-1.5 text-gray-400 hover:text-primary transition-colors">
                     <Feather.Share2 className="w-3.5 h-3.5" />
                   </button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-8">
        <div className="flex items-center gap-1">
          <PaginationButton disabled icon={Feather.ChevronLeft} />
          <PaginationButton label="1" />
          <PaginationButton active label="2" />
          <PaginationButton label="3" />
          <PaginationButton icon={Feather.ChevronRight} />
        </div>
      </div>
    </div>
  );
};

const PaginationButton = ({ label, icon: Icon, active, disabled }) => (
  <button 
    disabled={disabled}
    className={cn(
      "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200",
      active 
        ? "bg-primary text-white shadow-lg shadow-primary/20" 
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800",
      disabled && "opacity-40 cursor-not-allowed pointer-events-none"
    )}
  >
    {Icon ? <Icon className="w-4 h-4" /> : label}
  </button>
);

export default BlogGrid;
