import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  PageTitle, 
  Button, 
  Badge,
  Input,
  Avatar
} from '../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../lib/utils';
import { Quote } from 'lucide-react';

const BlogDetail = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Blog Details" 
        breadcrumbs={[
          { label: 'Blog', path: '#' },
          { label: 'Blog Details', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Main Content (Article) ── */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardBody className="p-0">
              <div className="p-6 sm:p-8 space-y-8">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight">
                    Beautiful Day with Friends
                  </h1>
                  <div className="flex items-center justify-center gap-6 text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      <Feather.Calendar className="w-4 h-4 text-primary" />
                      20 June, 2022
                    </div>
                    <div className="flex items-center gap-2">
                      <Feather.Tag className="w-4 h-4 text-primary" />
                      Project
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar name="Gilbert Smith" size="xs" />
                      Gilbert Smith
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                  <img src="/assets/images/small/img-2.jpg" alt="Article Cover" className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6 text-base leading-relaxed">
                  <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam enim ad minima veniam quis.</p>
                  
                  <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt.</p>

                  <div className="relative p-8 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border-l-4 border-primary italic">
                    <Quote className="absolute top-4 left-4 w-12 h-12 text-primary/10 -rotate-12" />
                    <p className="relative z-10 text-lg font-medium text-gray-800 dark:text-gray-200">
                      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium deleniti atque corrupti quos dolores et quas molestias excepturi sint quidem rerum facilis est."
                    </p>
                  </div>

                  <p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit.</p>

                  <div className="pt-6">
                    <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Core Principles:</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                      <li className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        Donec sodales sagittis
                      </li>
                      <li className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        Sed consequat leo eget
                      </li>
                      <li className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        Aliquam lorem ante
                      </li>
                      <li className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        Aenean ligula eget
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Social Share */}
                <div className="pt-8 border-t border-gray-100 dark:border-slate-700 flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share:</span>
                  <div className="flex gap-2">
                    <SocialButton icon={Feather.Facebook} />
                    <SocialButton icon={Feather.Twitter} />
                    <SocialButton icon={Feather.Linkedin} />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Comments Section */}
          <Card className="border-0 shadow-sm">
            <CardBody className="p-6 sm:p-8">
              <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                <Feather.MessageCircle className="w-6 h-6 text-primary" />
                Comments (4)
              </h5>

              <div className="space-y-8">
                <Comment 
                  author="Delores Williams" 
                  time="1 hr Ago" 
                  text="If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual." 
                />
                <div className="pl-6 sm:pl-12 border-l-2 border-gray-100 dark:border-slate-800 space-y-8">
                  <Comment 
                    author="Clarence Smith" 
                    time="2 hrs Ago" 
                    avatar="/assets/images/users/avatar-2.jpg"
                    text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet." 
                  />
                  <Comment 
                    author="Silvia Martinez" 
                    time="2 hrs Ago" 
                    text="To take a trivial example, which of us ever undertakes laborious physical exercise." 
                  />
                </div>
                <Comment 
                  author="Keith McCoy" 
                  time="12 Aug" 
                  text="Donec posuere vulputate arcu. phasellus accumsan cursus velit." 
                />
              </div>

              {/* Reply Form */}
              <div className="mt-12 pt-12 border-t border-gray-100 dark:border-slate-700">
                <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Leave a Reply</h5>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                      <Input placeholder="Enter your name" className="h-11 bg-gray-50 dark:bg-slate-900/50 border-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                      <Input type="email" placeholder="Enter your email" className="h-11 bg-gray-50 dark:bg-slate-900/50 border-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Message</label>
                    <textarea 
                      placeholder="Write your comment here..." 
                      className="w-full min-h-[120px] rounded-xl bg-gray-50 dark:bg-slate-900/50 border-none focus:ring-2 focus:ring-primary/20 text-sm p-4 resize-none"
                    ></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button variant="primary" className="px-8 shadow-lg shadow-primary/20">Post Comment</Button>
                  </div>
                </form>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* ── Sidebar (Reusing components from BlogList) ── */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardBody>
              <h5 className="text-base font-bold text-gray-800 dark:text-white mb-4">Search</h5>
              <div className="relative">
                <Input placeholder="Search..." className="pl-9 h-10 bg-gray-50 dark:bg-slate-900/50 border-none" />
                <Feather.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </CardBody>
          </Card>

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

          <Card className="bg-primary text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Feather.Send className="w-20 h-20 rotate-12" />
            </div>
            <CardBody className="relative z-10">
              <h5 className="text-base font-bold mb-2">Newsletter</h5>
              <p className="text-xs text-white/80 mb-4 font-medium leading-relaxed">Subscribe to get the latest updates.</p>
              <div className="flex gap-2">
                <Input placeholder="Email" className="h-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white/30" />
                <Button className="h-10 w-10 p-0 shrink-0 bg-white text-primary border-none">
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

const SocialButton = ({ icon: Icon }) => (
  <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-100 dark:border-slate-700 text-gray-400 hover:text-primary hover:border-primary transition-all">
    <Icon className="w-4 h-4" />
  </button>
);

const Comment = ({ author, time, text, avatar }) => (
  <div className="flex gap-4 group">
    <Avatar src={avatar} name={author} size="md" className="shrink-0" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <h6 className="text-sm font-bold text-gray-800 dark:text-white">{author}</h6>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{time}</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2 font-medium">{text}</p>
      <button className="text-xs font-bold text-primary flex items-center gap-1.5 hover:gap-2 transition-all">
        <Feather.CornerUpLeft className="w-3.5 h-3.5" />
        Reply
      </button>
    </div>
  </div>
);

const CategoryLink = ({ label, count }) => (
  <Link to="#" className="flex items-center justify-between p-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-primary/5 hover:text-primary transition-all group">
    {label}
    <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-[10px] group-hover:bg-primary group-hover:text-white transition-colors">{count}</span>
  </Link>
);

const MiniBlogCard = ({ image, title, date, time }) => (
  <div className="flex gap-4 group cursor-pointer">
    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="min-w-0 py-1">
      <h6 className="text-xs font-bold text-gray-800 dark:text-white truncate group-hover:text-primary transition-colors mb-1">{title}</h6>
      <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
        {date}
      </div>
    </div>
  </div>
);

export default BlogDetail;
