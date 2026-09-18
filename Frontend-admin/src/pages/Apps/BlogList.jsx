import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  PageTitle, 
  Button, 
  Badge,
  Input,
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from '../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../lib/utils';

const BlogList = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Blog List" 
        breadcrumbs={[
          { label: 'Blog', path: '#' },
          { label: 'Blog List', active: true },
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
              className="p-1.5 rounded-md bg-white dark:bg-slate-700 text-primary shadow-sm"
              title="List View"
            >
              <Feather.List className="w-4 h-4" />
            </Link>
            <Link 
              to="/apps-blog-grid" 
              className="p-1.5 rounded-md text-gray-500 hover:text-primary transition-colors"
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Main Content ── */}
        <div className="lg:col-span-8 space-y-6">
          <LargeBlogCard 
            image="/assets/images/small/img-3.jpg" 
            date="16 June, 2022" 
            title="Coffee with friends" 
            desc="Contrary to popular belief, Lorem Ipsum is not simply random text, a Latin professor at Hampden-Sydney College in Virginia." 
          />
          <LargeBlogCard 
            image="/assets/images/small/img-5.jpg" 
            date="22 May, 2022" 
            title="Working day with our new ideas" 
            desc="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour." 
          />
          <LargeBlogCard 
            image="/assets/images/small/img-1.jpg" 
            date="12 June, 2022" 
            title="Project discussion with team" 
            desc="Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words." 
          />

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

        {/* ── Sidebar ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Search */}
          <Card>
            <CardBody>
              <h5 className="text-base font-bold text-gray-800 dark:text-white mb-4">Search</h5>
              <div className="relative">
                <Input placeholder="Search..." className="pl-9 h-10 bg-gray-50 dark:bg-slate-900/50 border-none" />
                <Feather.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </CardBody>
          </Card>

          {/* Categories */}
          <Card>
            <CardBody>
              <h5 className="text-base font-bold text-gray-800 dark:text-white mb-4">Categories</h5>
              <div className="space-y-1">
                <CategoryLink label="Design" count="02" />
                <CategoryLink label="Development" count="04" />
                <CategoryLink label="Business" count="12" />
                <CategoryLink label="Project" count="08" />
                <CategoryLink label="Travel" count="10" />
              </div>
            </CardBody>
          </Card>

          {/* Upcoming Posts */}
          <Card>
            <CardBody>
              <h5 className="text-base font-bold text-gray-800 dark:text-white mb-4">Upcoming Posts</h5>
              <div className="space-y-4">
                <MiniBlogCard image="/assets/images/small/img-7.jpg" title="Beautiful Day with Friends" date="20 Aug, 2022" time="05:00 AM" />
                <MiniBlogCard image="/assets/images/small/img-2.jpg" title="Drawing a sketch" date="20 Aug, 2022" time="05:05 AM" />
                <MiniBlogCard image="/assets/images/small/img-6.jpg" title="Project discussion" date="20 Aug, 2022" time="05:10 PM" />
              </div>
            </CardBody>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardBody>
              <h5 className="text-base font-bold text-gray-800 dark:text-white mb-4">Tag Cloud</h5>
              <div className="flex flex-wrap gap-2">
                {['Design', 'Development', 'Wordpress', 'HTML', 'Project', 'Business', 'Travel'].map(tag => (
                  <Badge key={tag} variant="soft-primary" className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary hover:text-white transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Newsletter */}
          <Card className="bg-primary text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Feather.Send className="w-20 h-20 rotate-12" />
            </div>
            <CardBody className="relative z-10">
              <h5 className="text-base font-bold mb-2">Newsletter</h5>
              <p className="text-xs text-white/80 mb-4 font-medium leading-relaxed">Subscribe to get the latest updates and news directly in your inbox.</p>
              <div className="flex gap-2">
                <Input placeholder="Enter Email" className="h-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white/30" />
                <Button className="h-10 w-10 p-0 shrink-0 bg-white text-primary hover:bg-white/90 border-none">
                  <Feather.Send className="w-4 h-4" />
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

const LargeBlogCard = ({ image, date, title, desc }) => (
  <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300">
    <div className="relative overflow-hidden aspect-[21/9]">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
      />
      <div className="absolute bottom-4 left-4">
        <span className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg text-xs font-bold text-primary shadow-lg">
          {date}
        </span>
      </div>
    </div>
    <CardBody className="p-6 sm:p-8">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 hover:text-primary transition-colors cursor-pointer leading-tight">
        {title}
      </h3>
      <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6 font-medium">
        {desc}
      </p>
      <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-700">
        <Link to="#" className="text-sm font-bold text-primary flex items-center gap-2 group/btn">
          Read More Article
          <Feather.ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </Link>
        <div className="flex items-center gap-4 text-gray-400">
           <div className="flex items-center gap-1.5 text-xs font-medium">
             <Feather.MessageCircle className="w-4 h-4" />
             24
           </div>
           <div className="flex items-center gap-1.5 text-xs font-medium">
             <Feather.Heart className="w-4 h-4" />
             1.2k
           </div>
        </div>
      </div>
    </CardBody>
  </Card>
);

const MiniBlogCard = ({ image, title, date, time }) => (
  <div className="flex gap-4 group cursor-pointer">
    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="min-w-0 py-1">
      <h6 className="text-sm font-bold text-gray-800 dark:text-white truncate group-hover:text-primary transition-colors mb-1">{title}</h6>
      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
        <Feather.Calendar className="w-3 h-3" />
        {date}
        <span className="text-gray-300">•</span>
        {time}
      </div>
    </div>
  </div>
);

const CategoryLink = ({ label, count }) => (
  <Link to="#" className="flex items-center justify-between p-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-primary/5 hover:text-primary transition-all group">
    {label}
    <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-[10px] group-hover:bg-primary group-hover:text-white transition-colors">{count}</span>
  </Link>
);

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

export default BlogList;
