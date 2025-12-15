import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Wrench, 
  Save, 
  Plus, 
  Trash2, 
  Download,
  Eye,
  EyeOff,
  RotateCcw,
  Image as ImageIcon,
  Settings as SettingsIcon,
  Upload,
  X,
  Mail,
  Lock,
  LogOut,
  Loader2,
  AlertCircle,
  Github,
  Rocket
} from 'lucide-react';
import { INITIAL_DATA } from './constants';
import { PortfolioData, EducationItem, ExperienceItem, SkillItem, ServiceItem, WorkItem, WorkCategory, Settings, GitHubConfig } from './types';
import { GOOGLE_SCRIPT_URL } from './config';

// --- Helper Components ---

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-8 relative">
    <h2 className="uppercase text-[27px] font-heading font-bold text-dark pl-5 relative tracking-wide">
      {title}
      <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[4px] h-[90%] bg-dark"></span>
      <span className="absolute top-1/2 -translate-y-1/2 left-[6px] w-[2px] h-[90%] bg-dark"></span>
    </h2>
  </div>
);

const Input = ({ label, value, onChange, type = "text", placeholder = "", disabled = false }: { label: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, placeholder?: string, disabled?: boolean }) => (
  <div className="mb-6">
    <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full border-b-2 border-text bg-transparent py-2 px-3 text-[13px] text-dark focus:border-accent focus:outline-none transition-colors duration-300 font-sans placeholder-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
  </div>
);

const TextArea = ({ label, value, onChange }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => (
  <div className="mb-6">
    <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full border-b-2 border-text bg-transparent py-2 px-3 text-[13px] text-dark focus:border-accent focus:outline-none transition-colors duration-300 font-sans resize-none"
    />
  </div>
);

const Select = ({ label, value, onChange, options }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: { label: string, value: string }[] }) => (
    <div className="mb-6">
      <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border-b-2 border-text bg-transparent py-2 px-3 text-[13px] text-dark focus:border-accent focus:outline-none transition-colors duration-300 font-sans"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }: { children?: React.ReactNode, onClick: () => void, variant?: 'primary' | 'danger' | 'outline' | 'success', className?: string, disabled?: boolean }) => {
  let baseStyles = "inline-flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-wider py-2 px-6 transition-all duration-300 border-2 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  let variantStyles = "";

  if (variant === 'primary') {
    variantStyles = "border-dark text-text hover:bg-black hover:text-white hover:border-black";
  } else if (variant === 'danger') {
    variantStyles = "border-red-500 text-red-500 hover:bg-red-500 hover:text-white";
  } else if (variant === 'outline') {
    variantStyles = "border-accent text-accent hover:bg-accent hover:text-white";
  } else if (variant === 'success') {
    variantStyles = "border-green-600 text-green-600 hover:bg-green-600 hover:text-white";
  }

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
};

const ImageUpload = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB Check
        alert("File is too large! Please select an image under 2MB to ensure it saves correctly to browser storage.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">{label}</label>
      <div className="flex items-start gap-4">
        <div 
          className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center overflow-hidden cursor-pointer hover:border-accent transition-colors relative group"
          onClick={() => fileInputRef.current?.click()}
        >
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-2">
              <Upload size={24} className="mx-auto text-gray-400 mb-1" />
              <span className="text-[10px] text-gray-500">Click to upload</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-xs font-bold">Change</span>
          </div>
        </div>
        <div className="flex-1">
           <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          <Input 
            label="Or enter Image URL" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<keyof PortfolioData | 'settings'>('hero');
  const [showJson, setShowJson] = useState(false);
  const STORAGE_KEY = 'myself_cms_data';

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  
  // Credentials Change State
  const [credData, setCredData] = useState({ newEmail: '', newPass: '', confirmPass: '' });
  const [credLoading, setCredLoading] = useState(false);

  // Deployment State
  const [deploying, setDeploying] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge with initial data
        const merged = { ...INITIAL_DATA, ...parsed };
        
        // Deep merge
        if(parsed.settings) merged.settings = { ...INITIAL_DATA.settings, ...parsed.settings };
        if(parsed.hero) merged.hero = { ...INITIAL_DATA.hero, ...parsed.hero };
        if(parsed.about) merged.about = { ...INITIAL_DATA.about, ...parsed.about };
        if(parsed.contact) merged.contact = { ...INITIAL_DATA.contact, ...parsed.contact };
        if(parsed.works) merged.works = parsed.works;
        if(parsed.categories) merged.categories = parsed.categories;

        setData(merged);
        
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    
    // Check Session
    const sessionAuth = sessionStorage.getItem('myself_admin_auth');
    if (sessionAuth === 'true') {
        setIsAuthenticated(true);
    }
  }, []);

  // --- Auth Handlers ---

  const handleLogin = async () => {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.trim() === "") {
        alert("Configuration Missing! Please open 'config.ts' in your code editor and paste your Google Apps Script Web App URL.");
        return;
    }

    setAuthLoading(true);

    const emailToSend = loginEmail.trim();
    const passToSend = loginPass.trim();

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'login',
          email: emailToSend,
          password: passToSend
        })
      });
      
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        throw new Error("Server Error: Script returned HTML. Check deployment settings.");
      }

      if (result.status === 'success') {
        setIsAuthenticated(true);
        sessionStorage.setItem('myself_admin_auth', 'true');
      } else {
        setLoginPass("");
        alert("Login failed: " + (result.message || "Invalid credentials"));
      }
    } catch (e: any) {
      alert(e.message || "Connection error. Check config.ts and your internet.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem('myself_admin_auth');
      setLoginPass(""); 
      setLoginEmail("");
  };

  const handleUpdateCredentials = async () => {
      if(credData.newPass && credData.newPass !== credData.confirmPass) {
          alert("New passwords do not match.");
          return;
      }
      if(!credData.newEmail && !credData.newPass) {
          alert("Please enter a new email or password to update.");
          return;
      }
      if (!GOOGLE_SCRIPT_URL) return;

      setCredLoading(true);
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
              action: 'update_credentials',
              currentEmail: loginEmail, 
              currentPassword: loginPass,
              newEmail: credData.newEmail,
              newPassword: credData.newPass
            })
          });
          
          const text = await response.text();
          let result;
          try {
            result = JSON.parse(text);
          } catch (e) {
            throw new Error("Server Error: The script returned non-JSON.");
          }

          if(result.status === 'success') {
              alert("Credentials updated successfully! Please login again.");
              handleLogout();
              setCredData({ newEmail: '', newPass: '', confirmPass: '' });
          } else {
              alert("Failed: " + result.message);
          }
      } catch(e: any) {
          alert(e.message || "Error connecting to server.");
      } finally {
          setCredLoading(false);
      }
  };

  // --- Core Feature Handlers ---

  const handleInstantView = () => {
    // 1. Sync critical fields
    const dataToSave = {
      ...data,
      contact: { ...data.contact, formActionUrl: GOOGLE_SCRIPT_URL }
    };

    // 2. Save to localStorage for the preview page to read
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      setData(dataToSave); // Update state to match
      // 3. Open preview
      window.open('preview.html', '_blank');
    } catch (e) {
      alert("Error: Storage full. Please use fewer or smaller images.");
    }
  };

  const handleDeploy = async () => {
    const gh = data.settings.github;
    if (!gh || !gh.pat || !gh.username || !gh.repo) {
      alert("Deployment Configuration Missing! Please go to the Settings tab and configure your GitHub username, repo, and Personal Access Token (PAT).");
      setActiveTab('settings');
      return;
    }

    if (!confirm("Are you sure you want to deploy? This will commit changes to your GitHub repository and trigger a rebuild of the live site.")) {
      return;
    }

    setDeploying(true);

    try {
      // 1. Prepare Data
      const dataToSave = {
        ...data,
        contact: { ...data.contact, formActionUrl: GOOGLE_SCRIPT_URL }
      };

      // 2. Convert Data to TypeScript file string 
      // This overwrites 'constants.ts' in the repo so the build process uses the NEW data
      const fileContent = `
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = ${JSON.stringify(dataToSave, null, 2)};
`;
      const encodedContent = btoa(unescape(encodeURIComponent(fileContent))); // Handle UTF-8 strings
      const filePath = 'constants.ts'; // Assuming constants.ts is in root of src or similar
      const branch = gh.branch || 'main';

      // 3. Get SHA of existing file (Required by GitHub API for updates)
      const getUrl = `https://api.github.com/repos/${gh.username}/${gh.repo}/contents/${filePath}?ref=${branch}`;
      const getRes = await fetch(getUrl, {
        headers: {
          'Authorization': `token ${gh.pat}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!getRes.ok) throw new Error(`Failed to fetch file info: ${getRes.statusText}`);
      const getJson = await getRes.json();
      const sha = getJson.sha;

      // 4. Update File via GitHub API
      const putUrl = `https://api.github.com/repos/${gh.username}/${gh.repo}/contents/${filePath}`;
      const putRes = await fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${gh.pat}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update content via Admin Panel',
          content: encodedContent,
          sha: sha,
          branch: branch
        })
      });

      if (!putRes.ok) throw new Error(`Deployment failed: ${putRes.statusText}`);

      alert("Deployment Started! Changes pushed to GitHub. The live site will update in a few minutes.");
      
      // Also save locally just in case
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

    } catch (e: any) {
      console.error(e);
      alert(`Error Deploying: ${e.message}`);
    } finally {
      setDeploying(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      setData(INITIAL_DATA);
      localStorage.removeItem(STORAGE_KEY);
      handleLogout();
    }
  };

  // Section Update Functions
  const updateSettings = (field: keyof Settings, value: any) => {
    setData(prev => ({ ...prev, settings: { ...prev.settings, [field]: value } }));
  };
  const updateGithub = (field: keyof GitHubConfig, value: string) => {
    setData(prev => ({ 
      ...prev, 
      settings: { 
        ...prev.settings, 
        github: { ...prev.settings.github, [field]: value } as GitHubConfig
      } 
    }));
  };
  
  // ... (Other update functions remain the same)
  const updateHero = (field: keyof PortfolioData['hero'], value: string) => {
    setData(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };
  const updateAbout = (field: keyof PortfolioData['about'], value: any) => {
    setData(prev => ({ ...prev, about: { ...prev.about, [field]: value } }));
  };
  const updateContact = (field: keyof PortfolioData['contact'], value: string) => {
    setData(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
  };
  const updateListItem = <T extends { id: string }>(section: keyof PortfolioData, id: string, field: keyof T, value: any) => {
    setData(prev => ({ ...prev, [section]: (prev[section] as unknown as T[]).map(item => item.id === id ? { ...item, [field]: value } : item) }));
  };
  const addListItem = (section: keyof PortfolioData, newItem: any) => {
    setData(prev => ({ ...prev, [section]: [...(prev[section] as any[]), { ...newItem, id: Date.now().toString() }] }));
  };
  const removeListItem = (section: keyof PortfolioData, id: string) => {
    setData(prev => ({ ...prev, [section]: (prev[section] as any[]).filter(item => item.id !== id) }));
  };

  // Renderers for different sections
  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <div className="bg-white p-8 shadow-sm">
            <SectionHeader title="Settings & Configuration" />
            
            {/* GitHub Deployment Config */}
            <div className="mb-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                    <Github size={24} className="text-white" />
                    <div>
                        <h3 className="font-bold text-lg text-white">GitHub Configuration</h3>
                        <p className="text-xs text-gray-400">Required for the 'Deploy' button to work.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">GitHub Username</label>
                        <input 
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-sm focus:border-white outline-none transition-colors"
                            value={data.settings.github?.username || ''}
                            onChange={(e) => updateGithub('username', e.target.value)}
                            placeholder="e.g. johndoe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Repository Name</label>
                         <input 
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-sm focus:border-white outline-none transition-colors"
                            value={data.settings.github?.repo || ''}
                            onChange={(e) => updateGithub('repo', e.target.value)}
                            placeholder="e.g. my-portfolio"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Personal Access Token (PAT)</label>
                         <input 
                            type="password"
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-sm focus:border-white outline-none transition-colors"
                            value={data.settings.github?.pat || ''}
                            onChange={(e) => updateGithub('pat', e.target.value)}
                            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx..."
                        />
                        <p className="text-[10px] text-gray-500 mt-2">
                            Token requires <b>repo</b> scope. It is saved in your browser storage only.
                        </p>
                    </div>
                </div>
            </div>

            {/* General Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-b border-gray-100 pb-8">
              <div>
                 <h3 className="font-bold text-lg mb-4 text-dark flex items-center gap-2"><Wrench size={18}/> General</h3>
                <Input 
                  label="Site Title" 
                  value={data.settings.siteTitle} 
                  onChange={(e) => updateSettings('siteTitle', e.target.value)} 
                />
                <ImageUpload 
                  label="Site Logo"
                  value={data.settings.logo}
                  onChange={(val) => updateSettings('logo', val)}
                />
                <ImageUpload 
                  label="Favicon"
                  value={data.settings.favicon}
                  onChange={(val) => updateSettings('favicon', val)}
                />
              </div>
              <div>
                 <h3 className="font-bold text-lg mb-4 text-dark flex items-center gap-2"><SettingsIcon size={18}/> SEO</h3>
                 <Input 
                  label="Meta Author" 
                  value={data.settings.metaAuthor} 
                  onChange={(e) => updateSettings('metaAuthor', e.target.value)} 
                />
                 <TextArea 
                  label="Meta Description" 
                  value={data.settings.metaDescription} 
                  onChange={(e) => updateSettings('metaDescription', e.target.value)} 
                />
                 <TextArea 
                  label="Meta Keywords" 
                  value={data.settings.metaKeywords} 
                  onChange={(e) => updateSettings('metaKeywords', e.target.value)} 
                />
              </div>
            </div>

            {/* Admin Security Section */}
            <div>
                 <h3 className="font-bold text-lg mb-4 text-dark flex items-center gap-2"><Lock size={18}/> Admin Credentials</h3>
                 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-6">Update your login email and password. Leave fields blank if unchanged.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                            label="New Email Address" 
                            type="email"
                            placeholder={loginEmail}
                            value={credData.newEmail} 
                            onChange={(e) => setCredData({...credData, newEmail: e.target.value})} 
                        />
                         <div className="hidden md:block"></div>
                         <Input 
                            label="New Password" 
                            type="password"
                            value={credData.newPass} 
                            onChange={(e) => setCredData({...credData, newPass: e.target.value})} 
                        />
                         <Input 
                            label="Confirm New Password" 
                            type="password"
                            value={credData.confirmPass} 
                            onChange={(e) => setCredData({...credData, confirmPass: e.target.value})} 
                        />
                    </div>
                    <Button onClick={handleUpdateCredentials} disabled={credLoading} variant="primary">
                        {credLoading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={14}/> Updating...</span> : "Update Credentials"}
                    </Button>
                 </div>
            </div>
          </div>
        );

      // ... existing cases for hero, about, etc. reuse previous code logic ...
      case 'hero':
        return (
          <div className="bg-white p-8 shadow-sm">
            <SectionHeader title="Hero Section" />
            <div className="grid grid-cols-1 gap-6 max-w-2xl">
              <Input label="Greeting" value={data.hero.title} onChange={(e) => updateHero('title', e.target.value)} />
              <Input label="Name" value={data.hero.name} onChange={(e) => updateHero('name', e.target.value)} />
              <Input label="Subtitle / Role" value={data.hero.subtitle} onChange={(e) => updateHero('subtitle', e.target.value)} />
              <ImageUpload label="Background Image" value={data.hero.backgroundImage} onChange={(val) => updateHero('backgroundImage', val)} />
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="bg-white p-8 shadow-sm">
            <SectionHeader title="About Me" />
            <div className="grid grid-cols-1 gap-6 max-w-3xl">
               <ImageUpload label="Profile Image" value={data.about.image} onChange={(val) => updateAbout('image', val)} />
              <Input label="Main Title" value={data.about.mainTitle} onChange={(e) => updateAbout('mainTitle', e.target.value)} />
              <TextArea label="Biography" value={data.about.mainDescription} onChange={(e) => updateAbout('mainDescription', e.target.value)} />
              <div className="mt-6">
                <label className="block text-sm font-bold text-dark mb-4 uppercase tracking-wide border-b border-gray-200 pb-2">Key Features</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.about.features.map((feature, index) => (
                    <div key={index} className="p-4 bg-gray-50 border border-gray-100 rounded">
                      <Input label={`Feature ${index + 1} Title`} value={feature.title} onChange={(e) => { const newFeatures = [...data.about.features]; newFeatures[index].title = e.target.value; updateAbout('features', newFeatures); }} />
                      <TextArea label="Description" value={feature.description} onChange={(e) => { const newFeatures = [...data.about.features]; newFeatures[index].description = e.target.value; updateAbout('features', newFeatures); }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="bg-white p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6"><SectionHeader title="Education" /><Button onClick={() => addListItem('education', { degree: 'New Degree', school: 'School Name', year: 'Year' })} variant="outline"><span className="flex items-center gap-2"><Plus size={14} /> Add Education</span></Button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.education.map((item) => (
                <div key={item.id} className="relative p-6 bg-white border border-gray-200 hover:border-accent transition-colors duration-300 group">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => removeListItem('education', item.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button></div>
                  <Input label="Degree" value={item.degree} onChange={(e) => updateListItem<EducationItem>('education', item.id, 'degree', e.target.value)} />
                  <Input label="School / University" value={item.school} onChange={(e) => updateListItem<EducationItem>('education', item.id, 'school', e.target.value)} />
                  <Input label="Year Range" value={item.year} onChange={(e) => updateListItem<EducationItem>('education', item.id, 'year', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="bg-white p-8 shadow-sm">
             <div className="flex justify-between items-center mb-6"><SectionHeader title="Experience" /><Button onClick={() => addListItem('experience', { role: 'New Role', company: 'Company', year: 'Year' })} variant="outline"><span className="flex items-center gap-2"><Plus size={14} /> Add Experience</span></Button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.experience.map((item) => (
                <div key={item.id} className="relative p-6 bg-white border border-gray-200 hover:border-accent transition-colors duration-300 group">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => removeListItem('experience', item.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button></div>
                  <Input label="Job Role" value={item.role} onChange={(e) => updateListItem<ExperienceItem>('experience', item.id, 'role', e.target.value)} />
                  <Input label="Company" value={item.company} onChange={(e) => updateListItem<ExperienceItem>('experience', item.id, 'company', e.target.value)} />
                  <Input label="Duration" value={item.year} onChange={(e) => updateListItem<ExperienceItem>('experience', item.id, 'year', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="bg-white p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6"><SectionHeader title="Skills" /><Button onClick={() => addListItem('skills', { name: 'New Skill', percentage: 50 })} variant="outline"><span className="flex items-center gap-2"><Plus size={14} /> Add Skill</span></Button></div>
            <div className="space-y-6 max-w-2xl">
              {data.skills.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded">
                  <div className="flex-grow">
                    <Input label="Skill Name" value={item.name} onChange={(e) => updateListItem<SkillItem>('skills', item.id, 'name', e.target.value)} />
                    <div className="mt-2">
                      <div className="flex justify-between text-xs font-bold uppercase mb-1"><span>Proficiency</span><span>{item.percentage}%</span></div>
                      <input type="range" min="0" max="100" value={item.percentage} onChange={(e) => updateListItem<SkillItem>('skills', item.id, 'percentage', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent" />
                    </div>
                  </div>
                  <button onClick={() => removeListItem('skills', item.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="bg-white p-8 shadow-sm">
             <div className="flex justify-between items-center mb-6"><SectionHeader title="Services" /><Button onClick={() => addListItem('services', { icon: 'code', title: 'New Service', description: 'Description' })} variant="outline"><span className="flex items-center gap-2"><Plus size={14} /> Add Service</span></Button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.services.map((item) => (
                <div key={item.id} className="relative p-6 bg-white border border-gray-200 hover:border-accent transition-colors duration-300 group">
                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => removeListItem('services', item.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button></div>
                  <Input label="FontAwesome Icon Class" value={item.icon} onChange={(e) => updateListItem<ServiceItem>('services', item.id, 'icon', e.target.value)} />
                  <Input label="Service Title" value={item.title} onChange={(e) => updateListItem<ServiceItem>('services', item.id, 'title', e.target.value)} />
                  <TextArea label="Description" value={item.description} onChange={(e) => updateListItem<ServiceItem>('services', item.id, 'description', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'works':
            return (
              <div className="bg-white p-8 shadow-sm">
                <div className="mb-10 pb-10 border-b border-gray-200">
                   <SectionHeader title="Portfolio Categories" />
                   <div className="space-y-4 max-w-2xl">
                    {data.categories.map(cat => (
                      <div key={cat.id} className="flex gap-4 items-end bg-gray-50 p-4 rounded">
                        <div className="flex-1"><Input label="Category Name" value={cat.name} onChange={(e) => updateListItem<WorkCategory>('categories', cat.id, 'name', e.target.value)} /></div>
                        <div className="flex-1"><Input label="Filter Class" value={cat.filterClass} onChange={(e) => updateListItem<WorkCategory>('categories', cat.id, 'filterClass', e.target.value)} /></div>
                         <button onClick={() => removeListItem('categories', cat.id)} className="text-red-400 hover:text-red-600 mb-6 p-2"><Trash2 size={18} /></button>
                      </div>
                    ))}
                     <Button onClick={() => addListItem('categories', { name: 'New Category', filterClass: `cat-${Date.now()}` })} variant="outline"><span className="flex items-center gap-2"><Plus size={14} /> Add Category</span></Button>
                   </div>
                </div>
                <div className="flex justify-between items-center mb-6"><SectionHeader title="Recent Work Items" /><Button onClick={() => addListItem('works', { title: 'New Work', subtitle: 'Category', categoryId: data.categories[0]?.id || '', image: '', largeImage: '' })} variant="outline"><span className="flex items-center gap-2"><Plus size={14} /> Add Work Item</span></Button></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.works && data.works.map((item) => (
                    <div key={item.id} className="relative p-6 bg-white border border-gray-200 hover:border-accent transition-colors duration-300 group">
                       <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"><button onClick={() => removeListItem('works', item.id)} className="text-red-400 hover:text-red-600 bg-white p-1 rounded-full shadow-md"><Trash2 size={16} /></button></div>
                      <ImageUpload label="Thumbnail" value={item.image} onChange={(val) => updateListItem<WorkItem>('works', item.id, 'image', val)} />
                      <Input label="Project Title" value={item.title} onChange={(e) => updateListItem<WorkItem>('works', item.id, 'title', e.target.value)} />
                      <Input label="Subtitle / Description" value={item.subtitle} onChange={(e) => updateListItem<WorkItem>('works', item.id, 'subtitle', e.target.value)} />
                      <Select label="Category" value={item.categoryId} onChange={(e) => updateListItem<WorkItem>('works', item.id, 'categoryId', e.target.value)} options={data.categories.map(c => ({ label: c.name, value: c.id }))} />
                      <ImageUpload label="Large Image (Lightbox)" value={item.largeImage} onChange={(val) => updateListItem<WorkItem>('works', item.id, 'largeImage', val)} />
                    </div>
                  ))}
                </div>
              </div>
            );
      case 'contact':
        return (
           <div className="bg-white p-8 shadow-sm">
            <SectionHeader title="Contact Me Settings" />
            <div className="grid grid-cols-1 gap-6 max-w-2xl">
              <Input label="Address" value={data.contact.address} onChange={(e) => updateContact('address', e.target.value)} />
              <Input label="Phone Number" value={data.contact.phone} onChange={(e) => updateContact('phone', e.target.value)} />
              <Input label="Email Address (Displayed on site)" value={data.contact.email} onChange={(e) => updateContact('email', e.target.value)} />
            </div>
           </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  const NavItem = ({ id, icon: Icon, label }: { id: keyof PortfolioData | 'settings' | 'contact', icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 border-l-4 ${
        activeTab === id 
          ? 'bg-white text-accent border-accent shadow-sm' 
          : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  // --- Login Screen Render ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-10 shadow-2xl border-t-4 border-accent">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold tracking-widest text-dark">
              MY<span className="text-accent">ADMIN</span>
            </h1>
            <p className="text-sm text-gray-500 mt-2 uppercase tracking-wide">Secure Access</p>
          </div>
          
          <div className="space-y-6">
            <Input 
              label="Admin Email" 
              value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="admin@example.com"
            />
            
            <div className="relative">
                <Input 
                    label="Password" 
                    type={showLoginPass ? "text" : "password"}
                    value={loginPass} 
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                />
                 <button 
                    type="button"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
                >
                    {showLoginPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            
            <Button 
                onClick={handleLogin} 
                disabled={authLoading} 
                variant="primary" 
                className="w-full"
            >
              {authLoading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={14}/> Verifying...</span> : "Login to Dashboard"}
            </Button>
            
            <div className="mt-4 pt-4 border-t border-gray-100 text-[11px] text-gray-400 leading-tight">
                <p>Default: admin@example.com / admin123</p>
                <p className="mt-1">
                   {GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.trim() !== "" 
                     ? <span className="text-green-600 flex items-center gap-1"><Code2 size={12}/> Configured in config.ts</span>
                     : <span className="text-red-500 font-bold flex items-center gap-1"><AlertCircle size={12}/> Missing URL in config.ts</span>
                   }
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Dashboard Render ---
  return (
    <div className="flex min-h-screen bg-[#f2f2f2]">
      {/* Sidebar - Visual match to Dark/Blue theme */}
      <div className="w-64 bg-[#1a1a1a] flex-shrink-0 flex flex-col fixed h-full z-10 shadow-2xl">
        <div className="p-8 flex justify-center border-b border-gray-800">
          <div className="text-white font-heading font-bold text-2xl tracking-widest">
            MY<span className="text-accent">ADMIN</span>
          </div>
        </div>
        
        <nav className="flex-1 mt-6 overflow-y-auto">
          <NavItem id="settings" icon={SettingsIcon} label="Settings & SEO" />
          <NavItem id="hero" icon={LayoutDashboard} label="Home / Hero" />
          <NavItem id="about" icon={User} label="About Me" />
          <NavItem id="education" icon={GraduationCap} label="Education" />
          <NavItem id="experience" icon={Briefcase} label="Experience" />
          <NavItem id="skills" icon={Code2} label="Skills" />
          <NavItem id="services" icon={Wrench} label="Services" />
          <NavItem id="works" icon={ImageIcon} label="Recent Work" />
          <NavItem id="contact" icon={Mail} label="Contact Me" />
        </nav>

        <div className="p-6 border-t border-gray-800 space-y-2">
          <button 
            onClick={() => setShowJson(!showJson)}
            className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors"
          >
            <Eye size={14} /> {showJson ? 'Hide' : 'View'} Raw Data
          </button>
           <button 
            onClick={handleReset}
            className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold uppercase tracking-wider text-red-900 hover:text-red-500 transition-colors"
          >
            <RotateCcw size={14} /> Reset Data
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-white transition-colors border border-transparent hover:border-accent mt-4"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-white h-20 shadow-sm flex items-center justify-between px-8 sticky top-0 z-20">
          <h1 className="text-xl font-heading font-bold text-dark uppercase tracking-wide">
            Content Manager
          </h1>
          <div className="flex gap-4">
            <Button onClick={handleInstantView} variant="outline">
               <span className="flex items-center gap-2"><Eye size={16} /> Instant View</span>
            </Button>
            <Button onClick={handleDeploy} disabled={deploying} variant="success">
               {deploying ? (
                 <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Deploying...</span>
               ) : (
                 <span className="flex items-center gap-2"><Rocket size={16} /> Deploy to Live</span>
               )}
            </Button>
          </div>
        </header>

        {/* Editor Area */}
        <main className="p-8 max-w-6xl mx-auto">
          {showJson && (
            <div className="mb-8 p-6 bg-[#1e1e1e] text-gray-300 font-mono text-sm rounded shadow-lg overflow-auto max-h-96 border-l-4 border-accent">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}

          {renderContent()}
        </main>
      </div>
    </div>
  );
}
