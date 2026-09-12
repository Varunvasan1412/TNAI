import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import TextAnimation from '../../components/elements/TextAnimation';
import ObjViewer from './ObjViewer';
import Swal from 'sweetalert2';

import p1 from '../../assets/images/project/image-1.webp';
import p2 from '../../assets/images/project/image-1-1.webp';
import p3 from '../../assets/images/project/image-1-2.webp';
import p4 from '../../assets/images/project/image-1-3.webp';
import p5 from '../../assets/images/project/project-1-5.jpg';
import p6 from '../../assets/images/project/project-1-6.jpg';
import p7 from '../../assets/images/project/project-1-7.jpg';

const fallbackImages = [p1, p2, p3, p4, p5, p6, p7];
const IMAGE_EXTS = /\.(jpe?g|png|webp|gif|svg|avif|bmp)(\?.*)?$/i;

// Forces a real download even for cross-origin URLs (bypasses browser's nav-instead-of-download)
const triggerDownload = async (url: string, filename: string) => {
    try {
        const res = await fetch(url, { mode: 'cors' });
        if (!res.ok) throw new Error('fetch failed');
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10_000);
    } catch {
        // CORS blocked or 404 — open in new tab as fallback
        window.open(url, '_blank', 'noopener,noreferrer');
    }
};


const ImageWithLoader = ({ src, alt, style, className, ...props }: any) => {
    const [loaded, setLoaded] = useState(false);
    const imgRef = React.useRef<HTMLImageElement>(null);

    useEffect(() => {
        setLoaded(false);
    }, [src]);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setLoaded(true);
        }
    }, [src]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!loaded && (
                <div style={{
                    position: 'absolute',
                    border: '4px solid rgba(0,0,0,0.1)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    borderLeftColor: 'var(--rsistore-base)',
                    animation: 'spin 1s linear infinite'
                }} />
            )}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={className}
                style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
                {...props}
            />
        </div>
    );
};


const ProductDetail: React.FC = () => {
    const { category, productId } = useParams<{ category: string; productId: string }>();
    const navigate = useNavigate();

    const [activeImg, setActiveImg] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [tabFading, setTabFading] = useState(false);

    // Zoom Modal State
    const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
    const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
    const [isZooming, setIsZooming] = useState(false);

    // Enquiry Modal State
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
    const [enquiryForm, setEnquiryForm] = useState({
        name: '',
        email: '',
        phone_number: '',
        topic: '',
        further_customization: '',
        message: ''
    });
    const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleEnquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
    };

    const handleEnquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnquiryStatus('submitting');

        try {
            const response = await fetch(`${baseUrl}/api/product/enquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...enquiryForm,
                    product_id: product.id
                }),
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setIsEnquiryModalOpen(false);
                setEnquiryStatus('idle');
                setEnquiryForm({
                    name: '',
                    email: '',
                    phone_number: '',
                    topic: '',
                    further_customization: '',
                    message: ''
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Enquiry Submitted',
                    text: data.message || 'Product enquiry submitted successfully.',
                    confirmButtonColor: '#2E8B74'
                });
            } else {
                setEnquiryStatus('idle');
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: data.message || 'Failed to submit enquiry. Please try again.',
                    confirmButtonColor: '#e74c3c'
                });
            }
        } catch (error) {
            console.error("Enquiry submission error:", error);
            setEnquiryStatus('idle');
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Network error. Please try again later.',
                confirmButtonColor: '#e74c3c'
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setIsZooming(true);
        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: 'scale(2.5)'
        });
    };

    const handleMouseLeave = () => {
        setIsZooming(false);
        setZoomStyle({
            transformOrigin: 'center center',
            transform: 'scale(1)'
        });
    };

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [related, setRelated] = useState<any[]>([]);
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        const envBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://crm.rsistore.in';
        const cleanBaseUrl = envBaseUrl.endsWith('/') ? envBaseUrl.slice(0, -1) : envBaseUrl;
        setBaseUrl(cleanBaseUrl);

        const fetchProduct = fetch(`${cleanBaseUrl}/api/product/web/product/${productId}`).then(res => res.json());
        const fetchAll = fetch(`${cleanBaseUrl}/api/product/web/products`).then(res => res.json());

        Promise.all([fetchProduct, fetchAll])
            .then(([prodRes, allRes]) => {
                if (prodRes.status && prodRes.data) {
                    setProduct(prodRes.data);

                    // Find related products in same subcategory
                    if (allRes.status && allRes.data) {
                        const relatedProducts = allRes.data
                            .filter((p: any) => p.subcategory_id === prodRes.data.subcategory_id && p.id !== prodRes.data.id)
                            .slice(0, 4);
                        setRelated(relatedProducts);
                    }
                }
            })
            .catch(err => console.error("Error fetching product data:", err))
            .finally(() => setLoading(false));
    }, [productId]);

    // Always start on the 3D model (index 0) if one exists; otherwise first image
    useEffect(() => {
        if (!product) return;
        setActiveImg(0);
    }, [product?.id]);

    if (loading) {
        return (
            <section className="pd2-page">
                <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', color: '#64748B' }}>Loading product details...</p>
                </div>
            </section>
        );
    }

    if (!product) {
        return (
            <section className="pd2-page">
                <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '20px' }}>Product not found.</p>
                    <button className="thm-btn" onClick={() => navigate(-1)}>
                        Go Back <span className="icon-arrow-right"></span>
                    </button>
                </div>
            </section>
        );
    }

    const imgBase = product.id % fallbackImages.length;

    const resolveUrl = (p: string) =>
        p.startsWith('http') ? p : `${baseUrl}/${p.replace(/^\//, '')}`;

    // 3-D model files (new API fields)
    const objUrl: string | undefined = product.obj_file ? resolveUrl(product.obj_file) : undefined;
    const mtlUrl: string | undefined = product.mtl_file ? resolveUrl(product.mtl_file) : undefined;

    // Regular images from new field; fall back to legacy `images` array
    let imgs: string[] = [];
    const regularSrc: any[] = product.regular_images?.length
        ? product.regular_images
        : (product.images ?? []);

    imgs = regularSrc
        .map((img: any) => {
            const p = img.image_path || img.url || (typeof img === 'string' ? img : '');
            return typeof p === 'string' && p ? resolveUrl(p) : null;
        })
        .filter(Boolean) as string[];

    // Build full gallery: OBJ first (if any), then regular images, then fallbacks
    const galleryUrls: string[] = [
        ...(objUrl ? [objUrl] : []),
        ...imgs,
    ];
    if (galleryUrls.length === 0) {
        [0, 1, 2, 3].forEach(off =>
            galleryUrls.push(fallbackImages[(imgBase + off) % fallbackImages.length])
        );
    }
    // Alias for minimal diff in the render below
    const imgsAll = galleryUrls;

    const subCatName = product.subcategory?.sub_category_name ?? 'Product';
    const introText = product.description ?? product.subcategory?.sub_category_description ?? product.category?.category_description ?? 'Premium electrochemical product for industrial and research applications.';

    const isObjFile = (url: string) => url.toLowerCase().endsWith('.obj');

    const sections: any[] = product.sections || [];
    const tabLabels = ['Overview', ...sections.map((s: any) => s.title as string)];

    const renderField = (field: any) => {
        switch (field.field_type) {
            case 'text':
                return (
                    <div key={field.id} className="pd2-sf pd2-sf--text">
                        <div className="pd2-sf-text-card">
                            <span className="pd2-sf-chip">{field.field_label}</span>
                            <p className="pd2-sf-text-value">{field.field_value}</p>
                        </div>
                    </div>
                );
            case 'number':
                return (
                    <div key={field.id} className="pd2-sf pd2-sf--number">
                        <div className="pd2-sf-number-card">
                            <div className="pd2-sf-number-icon">
                                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div>
                                <span className="pd2-sf-chip">{field.field_label}</span>
                                <p className="pd2-sf-number-value">{field.field_value}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'rich_text':
                return (
                    <div key={field.id} className="pd2-sf pd2-sf--rich">
                        <div className="pd2-prose" dangerouslySetInnerHTML={{ __html: field.field_value }} />
                    </div>
                );
            case 'table': {
                let rows: any[] = [];
                try { rows = JSON.parse(field.field_value); } catch { }
                const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
                return (
                    <div key={field.id} className="pd2-sf pd2-sf--table">
                        <span className="pd2-sf-chip">{field.field_label}</span>
                        <div className="pd2-order-table-wrap">
                            <table className="pd2-order-table">
                                <thead>
                                    <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, ri) => (
                                        <tr key={ri}>
                                            {headers.map(h => <td key={h}>{row[h]}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            }
            case 'image': {
                const rawPath = field.file_path || field.field_value;
                if (!rawPath) return null;
                const imgUrl = rawPath.startsWith('http') ? rawPath : `${baseUrl}/${rawPath.replace(/^\//, '')}`;
                return (
                    <div key={field.id} className="pd2-sf pd2-sf--image">
                        <span className="pd2-sf-chip">{field.field_label}</span>
                        <div className="pd2-sf-image-wrap">
                            <img src={imgUrl} alt={field.field_label} className="pd2-sf-image" />
                        </div>
                    </div>
                );
            }
            case 'file': {
                const fileName = field.field_value || field.file_path?.split('/').pop() || field.field_label;
                // Priority: file_path (full stored path) → field_value as-is if it looks like a path
                // → field_value prefixed with likely uploads dir
                const buildUrl = (p: string) =>
                    p.startsWith('http') ? p : `${baseUrl}/${p.replace(/^\//, '')}`;

                let fileUrl: string | null = null;
                if (field.file_path) {
                    fileUrl = buildUrl(field.file_path);
                } else if (field.field_value) {
                    const val = String(field.field_value);
                    // If field_value already has a directory path, use it directly
                    // Otherwise prepend the section-files upload directory
                    fileUrl = val.includes('/')
                        ? buildUrl(val)
                        : buildUrl(`uploads/product_sections/${val}`);
                }
                const ext = (String(fileName).split('.').pop() ?? 'FILE').toUpperCase().slice(0, 4);

                const cardInner = (
                    <>
                        <div className="pd2-fcard__icon">
                            <span className="pd2-fcard__ext">{ext}</span>
                        </div>
                        <div className="pd2-fcard__body">
                            <span className="pd2-fcard__label">{field.field_label}</span>
                            <span className="pd2-fcard__fname">{fileName}</span>
                        </div>
                        <div className={`pd2-fcard__dl${fileUrl ? '' : ' pd2-fcard__dl--na'}`}>
                            <i className="fa fa-download" />
                        </div>
                    </>
                );

                return (
                    <div key={field.id} className="pd2-sf pd2-sf--file">
                        {fileUrl ? (
                            <button
                                type="button"
                                className="pd2-fcard"
                                onClick={() => triggerDownload(fileUrl, fileName)}
                            >
                                {cardInner}
                            </button>
                        ) : (
                            <div className="pd2-fcard pd2-fcard--no-link">
                                {cardInner}
                            </div>
                        )}
                    </div>
                );
            }
            default:
                return null;
        }
    };

    const switchTab = (idx: number) => {
        if (idx === activeTab) return;
        setTabFading(true);
        setTimeout(() => { setActiveTab(idx); setTabFading(false); }, 180);
    };

    return (
        <section className="pd2-page">
            <style>
                {`
                .pd2-zoom-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                }
                .pd2-zoom-modal-content {
                    background: #fff;
                    width: 100%;
                    max-width: 1100px;
                    height: 80vh;
                    border-radius: 12px;
                    position: relative;
                    display: flex;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    animation: zoomModalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes zoomModalIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .pd2-zoom-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: #f1f5f9;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 20px;
                    color: #0f172a;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .pd2-zoom-close:hover {
                    background: #e2e8f0;
                    transform: rotate(90deg);
                }
                .pd2-zoom-layout {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
                .pd2-zoom-main {
                    flex: 1;
                    padding: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f8fafc;
                    border-right: 1px solid #e2e8f0;
                }
                .pd2-zoom-container {
                    width: 100%;
                    max-width: 500px;
                    aspect-ratio: 1;
                    background: #fff;
                    border-radius: 8px;
                    overflow: hidden;
                    position: relative;
                    cursor: crosshair;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .pd2-zoom-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .pd2-zoom-img.smooth {
                    transition: transform 0.2s ease-out;
                }
                .pd2-zoom-sidebar {
                    width: 400px;
                    padding: 40px 30px;
                    background: #fff;
                    overflow-y: auto;
                }
                .pd2-zoom-sidebar h3 {
                    font-size: 24px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 8px;
                    line-height: 1.3;
                }
                .pd2-zoom-thumbs {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-top: 30px;
                }
                .pd2-zoom-thumb {
                    aspect-ratio: 1;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    background: #fff;
                    padding: 4px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .pd2-zoom-thumb.active {
                    border-color: var(--rsistore-base);
                }
                .pd2-zoom-thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                @media (max-width: 768px) {
                    .pd2-zoom-modal-overlay {
                        padding: 15px;
                    }
                    .pd2-zoom-modal-content {
                        height: auto;
                        max-height: 90vh;
                        overflow-y: auto;
                        display: block;
                    }
                    .pd2-zoom-layout {
                        display: block;
                        height: auto;
                    }
                    .pd2-zoom-main {
                        padding: 15px;
                        border-right: none;
                        border-bottom: 1px solid #e2e8f0;
                        height: 300px;
                        display: flex;
                    }
                    .pd2-zoom-sidebar {
                        width: 100%;
                        padding: 20px 15px;
                        height: 400px;
                        overflow-y: auto;
                    }
                    .pd2-zoom-sidebar h3 {
                        font-size: 20px;
                    }
                    .pd2-zoom-thumbs {
                        margin-top: 15px;
                        gap: 8px;
                    }
                    .pd2-zoom-container {
                        max-width: 280px;
                        margin: 0 auto;
                    }
                    .pd2-name {
                        font-size: 18px !important;
                    }
                }

                /* Enquiry Modal */
                .pd2-enquiry-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    overflow-y: auto;
                }
                .pd2-enquiry-modal-content {
                    background: #fff;
                    width: 100%;
                    max-width: 600px;
                    border-radius: 12px;
                    position: relative;
                    padding: 30px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    animation: zoomModalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .pd2-enquiry-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: #f1f5f9;
                    border: none;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    font-size: 18px;
                    color: #0f172a;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .pd2-enquiry-close:hover {
                    background: #e2e8f0;
                    transform: rotate(90deg);
                }
                .pd2-enquiry-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 20px;
                }
                .pd2-enquiry-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .pd2-enquiry-form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .pd2-enquiry-form-group label {
                    font-size: 14px;
                    font-weight: 600;
                    color: #475569;
                }
                .pd2-enquiry-form-group input,
                .pd2-enquiry-form-group textarea {
                    width: 100%;
                    padding: 10px 15px;
                    border: 1px solid #cbd5e1;
                    border-radius: 6px;
                    font-size: 15px;
                    color: #0f172a;
                    background: #f8fafc;
                    transition: all 0.2s;
                    box-sizing: border-box;
                }
                .pd2-enquiry-form-group input:focus,
                .pd2-enquiry-form-group textarea:focus {
                    outline: none;
                    border-color: var(--rsistore-base);
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(var(--rsistore-base-rgb), 0.1);
                }
                .pd2-enquiry-form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                @media (max-width: 500px) {
                    .pd2-enquiry-form-row {
                        grid-template-columns: 1fr;
                    }
                }
                .pd2-enquiry-submit {
                    background: var(--rsistore-gradient);
                    color: #fff;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin-top: 10px;
                }
                .pd2-enquiry-submit:hover {
                    background: #266b5a;
                }
                .pd2-enquiry-submit:disabled {
                    background: #94a3b8;
                    cursor: not-allowed;
                }
                .pd2-enquiry-message {
                    padding: 10px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 15px;
                }
                .pd2-enquiry-message.success {
                    background: #d1fae5;
                    color: #065f46;
                    border: 1px solid var(--rsistore-base);
                }
                .pd2-enquiry-message.error {
                    background: #fee2e2;
                    color: #991b1b;
                    border: 1px solid #ef4444;
                }

                /* ══════════════════════════════════════════
                   SECTION FIELDS — premium layout
                ══════════════════════════════════════════ */
                .pd2-section-pane { padding: 4px 0; }

                .pd2-section-fields {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }
                /* Non-file fields always span the full row */
                .pd2-sf--text,
                .pd2-sf--number,
                .pd2-sf--rich,
                .pd2-sf--table,
                .pd2-sf--image { grid-column: 1 / -1; }

                /* File-only sections: fixed 3-column grid for balanced layout */
                .pd2-section-fields--files {
                    grid-template-columns: repeat(3, 1fr);
                }
                @media (max-width: 900px) {
                    .pd2-section-fields--files { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 560px) {
                    .pd2-section-fields--files { grid-template-columns: 1fr; }
                }

                /* staggered entrance */
                .pd2-sf { animation: pd2FieldIn 0.38s cubic-bezier(0.16,1,0.3,1) both; }
                .pd2-section-fields .pd2-sf:nth-child(1) { animation-delay: 0.05s; }
                .pd2-section-fields .pd2-sf:nth-child(2) { animation-delay: 0.12s; }
                .pd2-section-fields .pd2-sf:nth-child(3) { animation-delay: 0.19s; }
                .pd2-section-fields .pd2-sf:nth-child(4) { animation-delay: 0.26s; }
                .pd2-section-fields .pd2-sf:nth-child(n+5) { animation-delay: 0.30s; }
                @keyframes pd2FieldIn {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }

                /* shared chip label */
                .pd2-sf-chip {
                    display: inline-block;
                    font-size: 10.5px;
                    font-weight: 700;
                    letter-spacing: 0.09em;
                    text-transform: uppercase;
                    color: var(--rsistore-base);
                    background: rgba(var(--rsistore-base-rgb), 0.09);
                    border: 1px solid rgba(var(--rsistore-base-rgb), 0.2);
                    padding: 3px 11px;
                    border-radius: 20px;
                    margin-bottom: 12px;
                }

                /* ── text ── */
                .pd2-sf-text-card {
                    background: linear-gradient(135deg, rgba(var(--rsistore-base-rgb), 0.07) 0%, #f8fafc 100%);
                    border-left: 4px solid var(--rsistore-base);
                    border-radius: 0 12px 12px 0;
                    padding: 18px 22px;
                }
                .pd2-sf-text-value {
                    font-size: 15.5px;
                    color: #1e293b;
                    line-height: 1.75;
                    margin: 0;
                }

                /* ── number ── */
                .pd2-sf-number-card {
                    display: flex;
                    align-items: center;
                    gap: 18px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    padding: 18px 22px;
                    box-shadow: 0 2px 8px rgba(var(--rsistore-base-rgb), 0.06);
                    width: fit-content;
                }
                .pd2-sf-number-icon {
                    width: 46px;
                    height: 46px;
                    border-radius: 12px;
                    background: var(--rsistore-gradient);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .pd2-sf-number-value {
                    font-size: 22px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 4px 0 0;
                    letter-spacing: 0.02em;
                }

                /* ── rich text prose ── */
                .pd2-prose {
                    font-size: 15px;
                    color: #334155;
                    line-height: 1.85;
                }
                .pd2-prose p { margin: 0 0 14px; }
                .pd2-prose p:last-child { margin-bottom: 0; }
                .pd2-prose strong { color: #0f172a; font-weight: 700; }
                .pd2-prose em { font-style: italic; }
                /* unordered list → card-style rows */
                .pd2-prose ul {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 14px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .pd2-prose ul li {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 12px 18px;
                    background: #f8fafc;
                    border-radius: 10px;
                    border-left: 3px solid var(--rsistore-base);
                    font-size: 14.5px;
                    color: #1e293b;
                    transition: background 0.18s, box-shadow 0.18s;
                }
                .pd2-prose ul li:hover {
                    background: rgba(var(--rsistore-base-rgb), 0.08);
                    box-shadow: 0 2px 8px rgba(var(--rsistore-base-rgb), 0.10);
                }
                .pd2-prose ul li::before {
                    content: '';
                    display: block;
                    width: 18px;
                    height: 18px;
                    min-width: 18px;
                    margin-top: 1px;
                    border-radius: 50%;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E"), var(--rsistore-gradient);
                    background-size: 11px, cover;
                    background-repeat: no-repeat, no-repeat;
                    background-position: center, center;
                }
                /* ordered list */
                .pd2-prose ol {
                    padding-left: 22px;
                    margin: 0 0 14px;
                }
                .pd2-prose ol li {
                    margin-bottom: 8px;
                    padding-left: 6px;
                }
                .pd2-prose ol li::marker {
                    color: var(--rsistore-base);
                    font-weight: 700;
                }

                /* ── table (Order Information) ── */
                .pd2-sf--table .pd2-sf-chip { margin-bottom: 14px; }
                .pd2-order-table-wrap {
                    overflow-x: auto;
                    border-radius: 14px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 0 0 1px #e2e8f0;
                }
                .pd2-order-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 340px;
                }
                .pd2-order-table thead tr th {
                    background: var(--rsistore-gradient);
                    color: #fff;
                    font-size: 12.5px;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    padding: 14px 22px;
                    text-align: left;
                    border: none;
                    white-space: nowrap;
                }
                .pd2-order-table thead tr th:first-child { border-radius: 14px 0 0 0; }
                .pd2-order-table thead tr th:last-child  { border-radius: 0 14px 0 0; }
                .pd2-order-table tbody tr td {
                    padding: 13px 22px;
                    font-size: 14px;
                    color: #334155;
                    background: #fff;
                    border-bottom: 1px solid #f1f5f9;
                    transition: background 0.15s;
                }
                .pd2-order-table tbody tr:nth-child(even) td { background: rgba(var(--rsistore-base-rgb), 0.03); }
                .pd2-order-table tbody tr:last-child td    { border-bottom: none; }
                .pd2-order-table tbody tr:hover td         { background: rgba(var(--rsistore-base-rgb), 0.08); }

                /* ── part number ── */
                .pd2-part-no {
                    font-size: 13px;
                    color: #64748b;
                    margin: 4px 0 12px;
                    letter-spacing: 0.01em;
                }
                .pd2-part-no strong { color: #334155; font-weight: 700; }

                /* ── image field ── */
                .pd2-sf--image .pd2-sf-chip { margin-bottom: 14px; }
                .pd2-sf-image-wrap {
                    border-radius: 14px;
                    overflow: hidden;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-height: 420px;
                }
                .pd2-sf-image {
                    max-width: 100%;
                    max-height: 420px;
                    object-fit: contain;
                    display: block;
                }

                /* File grid item — fill cell and stretch card to equal row height */
                .pd2-sf--file {
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                }
                .pd2-sf--file .pd2-fcard { flex: 1; }

                /* ── file card (premium) ── */
                .pd2-fcard {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 14px 16px;
                    background: #fff;
                    border: 1.5px solid #e8edf5;
                    border-radius: 16px;
                    text-decoration: none;
                    color: inherit;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
                }
                .pd2-fcard:hover {
                    border-color: var(--rsistore-base);
                    box-shadow: 0 10px 32px rgba(46,139,116,0.18);
                    transform: translateY(-3px);
                }
                .pd2-fcard:hover .pd2-fcard__dl {
                    background: var(--rsistore-gradient);
                    color: #fff;
                    box-shadow: 0 4px 14px rgba(46,139,116,0.4);
                    transform: scale(1.1);
                }
                /* Non-downloadable card — looks normal, no hover lift */
                .pd2-fcard--no-link { cursor: default; }
                .pd2-fcard--no-link:hover {
                    border-color: #e8edf5;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
                    transform: none;
                }
                .pd2-fcard--no-link:hover .pd2-fcard__dl {
                    background: rgba(var(--rsistore-base-rgb), 0.1);
                    color: var(--rsistore-base);
                    box-shadow: none;
                    transform: none;
                }
                /* Download button — greyed when no file */
                .pd2-fcard__dl--na {
                    opacity: 0.25;
                    cursor: default;
                }

                /* Document-style icon with folded corner */
                .pd2-fcard__icon {
                    width: 46px;
                    height: 54px;
                    border-radius: 8px 3px 8px 8px;
                    background: var(--rsistore-gradient);
                    box-shadow: 0 4px 14px rgba(46,139,116,0.35);
                    position: relative;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .pd2-fcard__icon::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 14px;
                    height: 14px;
                    background: rgba(255,255,255,0.3);
                    clip-path: polygon(0 0, 100% 100%, 100% 0);
                    border-radius: 0 3px 0 0;
                }
                .pd2-fcard__ext {
                    font-size: 8.5px;
                    font-weight: 900;
                    color: #fff;
                    letter-spacing: 0.07em;
                    text-transform: uppercase;
                    margin-top: 6px;
                }

                /* Text */
                .pd2-fcard__body {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .pd2-fcard__label {
                    font-size: 13px;
                    font-weight: 700;
                    color: #0f172a;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1.3;
                }
                .pd2-fcard__fname {
                    font-size: 11px;
                    color: #94a3b8;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-weight: 500;
                }

                /* Download circle button */
                .pd2-fcard__dl {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(var(--rsistore-base-rgb), 0.1);
                    color: var(--rsistore-base);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    flex-shrink: 0;
                    transition: background 0.25s, color 0.25s, box-shadow 0.25s, transform 0.25s;
                }
                `}
            </style>

            {/* ── Enquiry Modal ── */}
            {isEnquiryModalOpen && (
                <div className="pd2-enquiry-modal-overlay" onClick={() => setIsEnquiryModalOpen(false)}>
                    <div className="pd2-enquiry-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="pd2-enquiry-close" onClick={() => setIsEnquiryModalOpen(false)}>
                            <i className="fa fa-times"></i>
                        </button>
                        <h3 className="pd2-enquiry-title">Request a Quote</h3>
                        <form className="pd2-enquiry-form" onSubmit={handleEnquirySubmit}>
                            <div className="pd2-enquiry-form-row">
                                <div className="pd2-enquiry-form-group">
                                    <label>Name <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input type="text" name="name" value={enquiryForm.name} onChange={handleEnquiryChange} required placeholder="Your Name" />
                                </div>
                                <div className="pd2-enquiry-form-group">
                                    <label>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input type="tel" name="phone_number" value={enquiryForm.phone_number} onChange={handleEnquiryChange} required placeholder="Phone Number" />
                                </div>
                            </div>
                            <div className="pd2-enquiry-form-row">
                                <div className="pd2-enquiry-form-group">
                                    <label>Email <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input type="email" name="email" value={enquiryForm.email} onChange={handleEnquiryChange} required placeholder="Email Address" />
                                </div>
                                <div className="pd2-enquiry-form-group">
                                    <label>Topic <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input type="text" name="topic" value={enquiryForm.topic} onChange={handleEnquiryChange} required placeholder="e.g. Bulk Order Request" />
                                </div>
                            </div>
                            <div className="pd2-enquiry-form-group">
                                <label>Further Customization</label>
                                <input type="text" name="further_customization" value={enquiryForm.further_customization} onChange={handleEnquiryChange} placeholder="Any specific requirements?" />
                            </div>
                            <div className="pd2-enquiry-form-group">
                                <label>Message <span style={{ color: '#ef4444' }}>*</span></label>
                                <textarea name="message" value={enquiryForm.message} onChange={handleEnquiryChange} required rows={4} placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="submit" className="pd2-enquiry-submit" disabled={enquiryStatus === 'submitting'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                {enquiryStatus === 'submitting' ? (
                                    <>
                                        <i className="fa fa-spinner fa-spin"></i> Submitting...
                                    </>
                                ) : (
                                    'Submit Enquiry'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Zoom Modal ── */}
            {isZoomModalOpen && (
                <div className="pd2-zoom-modal-overlay" onClick={() => setIsZoomModalOpen(false)}>
                    <div className="pd2-zoom-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="pd2-zoom-close" onClick={() => setIsZoomModalOpen(false)}>
                            <i className="fa fa-times"></i>
                        </button>
                        <div className="pd2-zoom-layout">
                            {/* Left: Main Zoom Area */}
                            <div className="pd2-zoom-main">
                                <div
                                    className="pd2-zoom-container"
                                    onMouseMove={!isObjFile(imgsAll[activeImg] || '') ? handleMouseMove : undefined}
                                    onMouseLeave={!isObjFile(imgsAll[activeImg] || '') ? handleMouseLeave : undefined}
                                    style={{ cursor: isObjFile(imgsAll[activeImg] || '') ? 'default' : 'crosshair' }}
                                >
                                    {isObjFile(imgsAll[activeImg] || '') ? (
                                        <ObjViewer url={imgsAll[activeImg] || ''} mtlUrl={mtlUrl} />
                                    ) : (
                                        <ImageWithLoader
                                            src={imgsAll[activeImg] || imgsAll[0]}
                                            alt={product.product_name}
                                            style={zoomStyle}
                                            className={`pd2-zoom-img ${!isZooming ? 'smooth' : ''}`}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Right: Info and Thumbs */}
                            <div className="pd2-zoom-sidebar">
                                <h3 className="pd2-name" style={{ fontSize: '28px', marginBottom: '10px', marginTop: '0' }}>
                                    <TextAnimation>{product.product_name?.trim()}</TextAnimation>
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
                                    {subCatName}
                                </p>
                                <div className="pd2-zoom-thumbs">
                                    {imgsAll.map((src, i) => isObjFile(src) ? null : (
                                        <button
                                            key={i}
                                            className={`pd2-zoom-thumb ${activeImg === i ? 'active' : ''}`}
                                            onClick={() => setActiveImg(i)}
                                        >
                                            <img src={src} alt="" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container">

                {/* ── Back button — right-aligned ── */}
                <div className="pd2-top-bar">
                    <button
                        type="button"
                        className="plist-back-btn scat-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        <i className="fa fa-solid fa-arrow-left"></i>
                        <span>Back</span>
                    </button>
                </div>

                {/* ── Hero ── */}
                <div className="pd2-hero">

                    {/* Gallery */}
                    <div className="pd2-gallery">
                        <div className="pd2-thumbs">
                            {imgsAll.map((src, i) => (
                                <button
                                    key={i}
                                    className={`pd2-thumb${activeImg === i ? ' active' : ''}`}
                                    onClick={() => setActiveImg(i)}
                                    aria-label={`View image ${i + 1}`}
                                >
                                    {isObjFile(src) ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f8fafc', color: '#94a3b8' }}>
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                                <line x1="12" y1="22.08" x2="12" y2="12" />
                                            </svg>
                                            <span style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>3D VIEW</span>
                                        </div>
                                    ) : (
                                        <img src={src} alt="" loading="lazy" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="pd2-main-wrap">
                            <div
                                className="pd2-main-img"
                                style={{ cursor: isObjFile(imgsAll[activeImg] || '') ? 'default' : 'zoom-in' }}
                                onClick={() => !isObjFile(imgsAll[activeImg] || '') && setIsZoomModalOpen(true)}
                            >
                                {isObjFile(imgsAll[activeImg] || imgsAll[0]) ? (
                                    <ObjViewer url={imgsAll[activeImg] || imgsAll[0]} mtlUrl={mtlUrl} />
                                ) : (
                                    <ImageWithLoader
                                        key={activeImg}
                                        src={imgsAll[activeImg] || imgsAll[0]}
                                        alt={product.product_name}
                                    />
                                )}
                            </div>
                            <div className="pd2-dots">
                                {imgsAll.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`pd2-dot${activeImg === i ? ' active' : ''}`}
                                        onClick={() => setActiveImg(i)}
                                        aria-label={`Image ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Info panel */}
                    <div className="pd2-info">
                        <span className="pd2-badge">{subCatName}</span>
                        <h3 className="pd2-name" style={{ marginTop: '10px' }}>
                            <TextAnimation>{product.product_name?.trim()}</TextAnimation>
                        </h3>
                        {product.part_number && (
                            <p className="pd2-part-no">
                                Part No: <strong>{product.part_number}</strong>
                            </p>
                        )}
                        <p className="pd2-desc">
                            {introText.length > 200
                                ? introText.slice(0, 200).trimEnd() + '…'
                                : introText}
                        </p>

                        <div className="pd2-features">
                            {(product.key_features || []).map((spec: any, idx: number) => (
                                <div key={idx} className="pd2-feature">
                                    <div className="pd2-feature__icon">
                                        <i className="fa fa-solid fa-check-circle"></i>
                                    </div>
                                    <div className="pd2-feature__text">
                                        <span className="pd2-feature__label">{spec.feature_name}</span>
                                        <span className="pd2-feature__value">{spec.value}</span>
                                    </div>
                                </div>
                            ))}
                            {(!product.key_features || product.key_features.length === 0) && (
                                <div className="pd2-feature">
                                    <div className="pd2-feature__icon">
                                        <i className="fa fa-solid fa-check"></i>
                                    </div>
                                    <div className="pd2-feature__text">
                                        <span className="pd2-feature__label">Quality</span>
                                        <span className="pd2-feature__value">Premium Grade</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pd2-actions">
                            {product.data_sheet ? (
                                <button
                                    type="button"
                                    className="pd2-btn-primary"
                                    onClick={() => triggerDownload(
                                        `${baseUrl}/${product.data_sheet.replace(/^\//, '')}`,
                                        product.data_sheet.split('/').pop() ?? 'datasheet.pdf'
                                    )}
                                >
                                    <span>Download Datasheet</span>
                                    <i className="fa fa-download"></i>
                                </button>
                            ) : (
                                <button className="pd2-btn-primary" disabled style={{ opacity: 0.45, cursor: 'not-allowed' }}>
                                    <span>Datasheet Unavailable</span>
                                    <i className="fa fa-download"></i>
                                </button>
                            )}
                            <button className="thm-btn" style={{ borderRadius: '50px' }} onClick={() => setIsEnquiryModalOpen(true)}>
                                Request a Quote <span className="icon-arrow-right"></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Tab Bar ── */}
                <div className="pd2-tab-bar" role="tablist">
                    {tabLabels.map((label: string, i: number) => (
                        <button
                            key={label}
                            role="tab"
                            aria-selected={activeTab === i}
                            className={`pd2-tab${activeTab === i ? ' active' : ''}`}
                            onClick={() => switchTab(i)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── Tab Content ── */}
                <div className={`pd2-tab-content${tabFading ? ' fading' : ''}`}>

                    {/* Overview */}
                    {activeTab === 0 && (
                        <div className="pd2-tab-pane" key="overview">
                            <p className="pd2-overview-text">{introText}</p>
                        </div>
                    )}

                    {/* Dynamic Sections */}
                    {activeTab > 0 && sections[activeTab - 1] && (
                        <div className="pd2-tab-pane pd2-section-pane" key={`section-${activeTab}`}>
                            {(() => {
                                const sec = sections[activeTab - 1];
                                const allFiles = sec.fields.every((f: any) => f.field_type === 'file');
                                return (
                                    <div className={`pd2-section-fields${allFiles ? ' pd2-section-fields--files' : ''}`}>
                                        {sec.fields.map((field: any) => renderField(field))}
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </div>

                {/* ── You May Also Like ── */}
                {related.length > 0 && (
                    <div className="pd2-related">
                        <h3 className="pd2-related-title">You May Also Like</h3>
                        <div className="pd2-related-grid">
                            {related.map((rp) => {
                                const relImgSrc = (() => {
                                    // Prefer regular_images, fall back to legacy images
                                    const src: any[] = rp.regular_images?.length
                                        ? rp.regular_images
                                        : (rp.images ?? []);
                                    const validImg = src.find((img: any) =>
                                        IMAGE_EXTS.test(img?.image_path || '')
                                    ) ?? src[0];
                                    const url = validImg?.image_path;
                                    if (url) return url.startsWith('http') ? url : `${baseUrl}/${url.replace(/^\//, '')}`;
                                    return fallbackImages[rp.id % fallbackImages.length];
                                })();
                                return (
                                    <button
                                        key={rp.id}
                                        className="pd2-rel-card"
                                        onClick={() => {
                                            navigate(`/products/${category}/${rp.id}`);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        <div className="pd2-rel-card__img">
                                            <img src={relImgSrc} alt={rp.product_name} loading="lazy" />
                                            <div className="pd2-rel-card__overlay">
                                                <span className="pd2-rel-view">
                                                    <i className="fa fa-eye"></i>
                                                    View
                                                </span>
                                            </div>
                                        </div>
                                        <div className="pd2-rel-card__body">
                                            <div className="pd2-rel-card__info">
                                                <span className="pd2-rel-cat">{rp.subcategory?.sub_category_name || 'Product'}</span>
                                                <span className="pd2-rel-name">{rp.product_name}</span>
                                            </div>
                                            <span className="pd2-rel-arrow">
                                                <i className="fa fa-arrow-right"></i>
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default ProductDetail;
