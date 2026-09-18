import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Feather from 'react-feather';
import { useBlogStore } from '../../../store/store';
import axiosInstance from '../../../api/axios';
// import { blogPosts } from '../data/blogData';

const CircuitBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-primary/8 to-[#8CC63F]/5 blur-[130px]" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/8 to-primary/5 blur-[130px]" />
    <svg className="w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bv-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
        </linearGradient>
        <filter id="bv-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect x="3%" y="6%" width="80" height="80" rx="7" stroke="url(#bv-g)" strokeWidth="2" fill="none" />
      <circle cx="50%" cy="48%" r="260" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="10,8" fill="none" />
      <circle cx="50%" cy="48%" r="340" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="14,12" fill="none" />
      <path d="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460" stroke="var(--color-primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 260 0 L 260 180 L 340 260 L 580 260 L 640 320 L 640 1100" stroke="#E67E22" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4" fill="var(--color-primary)" filter="url(#bv-glow)">
        <animateMotion dur="9s" repeatCount="indefinite" path="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460" />
      </circle>
      <circle cx="340" cy="300" r="5" fill="var(--color-primary)" />
      <path d="M 36 36 H 100 M 36 36 V 100" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 36 H 1500 M 1564 36 V 100" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 36 1064 H 100 M 36 1064 V 1000" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 1064 H 1500 M 1564 1064 V 1000" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

const catColors = {
  Research: { from: 'var(--color-primary)', to: '#8CC63F' },
  Industry: { from: 'var(--color-secondary)', to: '#2980B9' },
  Trends: { from: '#E67E22', to: '#D35400' },
  Technical: { from: '#9B59B6', to: '#8E44AD' },
  Platform: { from: '#1ABC9C', to: '#16A085' },
};

const BlogView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const post     = blogPosts.find(p => String(p.id) === String(id));

  const { singleBlog, fetchSingleBlog, loading } = useBlogStore();
  const [webAdditionalImages, setWebAdditionalImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchSingleBlog(id);
  }, [id]);

  useEffect(() => {
    let imgs = singleBlog?.additional_images || singleBlog?.images;
    if (imgs) {
      if (typeof imgs === 'string') {
        try {
          imgs = JSON.parse(imgs);
        } catch (e) {
          imgs = [];
        }
      }
      if (Array.isArray(imgs)) {
        setWebAdditionalImages(imgs);
      }
    } else {
      setWebAdditionalImages([]);
    }
  }, [singleBlog]);

  console.log("singleBlog :", singleBlog)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!singleBlog) return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Feather.BookOpen className="w-12 h-12 text-gray-300" />
      <p className="font-bold text-gray-500">Blog post not found</p>
      <button onClick={() => navigate('/admin/blog')}
        className="px-5 py-2 rounded-xl text-sm font-bold text-white"
        style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
        Back to Blog
      </button>
    </div>
  );

  // const cc = catColors[post.category] || catColors.Research;
  const cc = catColors.Research;

  return (
    <div className="relative space-y-6 min-h-screen pb-10">
      <CircuitBg />
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15"/>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Blog Post</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <button onClick={() => navigate('/admin/dashboard')} className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">CRM</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <button onClick={() => navigate('/admin/blog')} className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">Blog</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-[12px] font-bold text-primary">View</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() =>
            // navigate(`/admin/blog/edit/${post.id}`)}
            navigate(`/admin/blog/edit/${singleBlog?.id}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white
                       transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow: '0 4px 14px rgba(49,151,96,0.25)' }}>
            <Feather.Edit2 className="w-4 h-4" /> Edit
          </button>
          <button onClick={() => navigate('/admin/blog')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold
                       text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm
                       border border-gray-200/60 hover:border-primary/40 hover:text-primary
                       shadow-sm transition-all duration-200">
            <Feather.ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <motion.div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>

        {/* Left: Meta sidebar */}
        <div className="lg:col-span-1 space-y-4">

          {/* Featured image */}
          {/* <div className="rounded-2xl overflow-hidden"
               style={{ background:`linear-gradient(135deg, ${cc.from}, ${cc.to})`, boxShadow:`0 8px 32px ${cc.from}30` }}>
            <div className="h-48 flex flex-col items-center justify-center p-6 relative">
              <div className="absolute inset-0 bg-black/10"/>
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Feather.BookOpen className="w-7 h-7 text-white"/>
                </div>
                <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                  {post.category}
                </span>
              </div> */}
          {/* Shine */}
          {/* <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent"/>
            </div>
          </div> */}

          <div className="rounded-2xl overflow-hidden bg-white p-3 dark:bg-slate-800/65">
            <img
              src={singleBlog?.blog_image ? `${import.meta.env.VITE_API_BASE_URL}/${singleBlog?.blog_image}` : ''}
              alt={singleBlog?.blog_title}
              className="w-full h-[260px] object-cover rounded-xl"
            />
          </div>

          {/* Post meta */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5 space-y-4"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="h-[3px] -mt-5 -mx-5 mb-5 rounded-t-2xl"
              style={{ background: `linear-gradient(90deg, ${cc.from}, ${cc.to})` }} />
            {[
              {
                icon: Feather.User,
                label: "Author",
                value: singleBlog?.author_name,
              },
              {
                icon: Feather.Calendar,
                label: "Published",
                value: new Date(singleBlog?.created_at).toLocaleDateString(),
              },
              {
                icon: Feather.Activity,
                label: "Status",
                value:
                  singleBlog?.status === 1
                    ? "Published"
                    : "Draft",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(49,151,96,0.10)' }}>
                  <Icon className="w-4 h-4" style={{ color: cc.from }} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{label}</p>
                  <p className="text-[13px] font-bold text-gray-700 dark:text-gray-200">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-2 space-y-4">

          {/* Title */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: `${cc.from}18`, color: cc.from }}>
                Blog
              </span>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${singleBlog?.status === 1
                ? 'bg-primary/10 text-primary'
                : 'bg-[#E67E22]/10 text-[#E67E22]'
                }`}>
                {singleBlog?.status === 1 ? "Published" : "Draft"}
              </span>
            </div>
            <h2 className="text-[22px] font-black text-gray-800 dark:text-white leading-snug tracking-tight">
              {singleBlog?.blog_title}
            </h2>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100/60 dark:border-slate-700/40">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black"
                style={{ background: `linear-gradient(135deg,${cc.from},${cc.to})` }}>
                {singleBlog?.author_name?.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-[12px] font-semibold text-gray-500">{singleBlog?.author_name}</span>
              <span className="text-gray-300">·</span>
              <span className="text-[12px] text-gray-400">{new Date(singleBlog?.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Short Description */}
          {singleBlog?.short_description && (
            <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                            backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
              style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.18em] mb-3">Short Description</p>
              <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                {singleBlog.short_description}
              </p>
            </div>
          )}

          {/* Content body */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.18em] mb-4">Content</p>
            <div className="prose prose-sm max-w-none">
              <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.85] font-medium">
                <div
                  dangerouslySetInnerHTML={{
                    __html: singleBlog?.blog_description
                  }}
                />
              </p>
            </div>
          </div>

          {/* Additional Images */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.18em] mb-4">Additional Images</p>

            {webAdditionalImages.length > 0 ? (
              <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
                {webAdditionalImages.map((img, i) => {
                  const imagePath = img.image_path || img.path || img.url || img;
                  const src = typeof imagePath === 'string' && imagePath.startsWith('http')
                    ? imagePath
                    : `${import.meta.env.VITE_API_BASE_URL}/${imagePath}`;

                  return (
                    <div key={i} className="break-inside-avoid rounded-xl overflow-hidden border border-gray-200/60 dark:border-slate-700/60 mb-4 inline-block w-full cursor-pointer" onClick={() => setSelectedImage(src)}>
                      <img
                        src={src}
                        alt={`Additional ${i}`}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[13px] text-gray-400 dark:text-gray-500 font-medium italic">No additional images</p>
            )}
          </div>

          {/* Action strip */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-[12px] font-semibold text-gray-400">
                Post ID: <span className="font-black text-gray-600 dark:text-gray-300">#BLOG-{String(singleBlog?.id).padStart(4, '0')}</span>
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => navigate(`/admin/blog/edit/${singleBlog.id}`)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg,${cc.from},${cc.to})`, boxShadow: `0 4px 14px ${cc.from}28` }}>
                  <Feather.Edit2 className="w-3.5 h-3.5" /> Edit Post
                </button>
                <button onClick={() => navigate('/admin/blog')}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold
                             text-gray-600 bg-gray-100/70 hover:bg-gray-200/70 transition-all">
                  <Feather.List className="w-3.5 h-3.5" /> All Posts
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/80 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors z-[101]"
              >
                <Feather.X className="w-5 h-5" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogView;
