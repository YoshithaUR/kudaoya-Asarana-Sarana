import React, { createContext, useContext, useState, useEffect } from 'react';
import { homeImages, communityMemberImages } from '../assets/image';

const DataContext = createContext();

// Initial Default Data
const defaultData = {
    hero: {
        titleLine1: 'කුඩාඔය',
        titleAccent: 'අසරණ සරණ',
        titlePlain: 'සමිතිය',
        eyebrow: 'Empowering Communities Since 1991',
        subtitle: 'නව ලොවක් කරා පියනගන අපගේ ගමනට ඔබත් එක්වන්න. සහයෝගය සහ සංවර්ධනය තුළින් ශක්තිමත් හෙටක්.',
        membersCount: 189,
        yearsCount: 35,
        projectsCount: 35
    },
    about: {
        eyebrow: 'Our Story & Vision',
        titleLine1: 'අපගේ',
        titleAccent: 'අරමුණ සහ ඉතිහාසය',
        desc1: 'කුඩාඔය අසරණ සරණ සමිතිය 1991 වසරේදී ප්‍රදේශවාසී ගම්වාසීන්ගේ සහයෝගයෙන් ආරම්භ කරන ලද නොමැකෙන සමාජ සත්කාරක සංවිධානයකි.',
        desc2: 'ග්‍රාමීය මට්ටමින් අසරණ වූ පවුල්වලට, වැඩිහිටියන්ට සහ පාසල් දරුවන්ට මූල්‍යමය හා ද්‍රව්‍යමය අතින් සහය වීම අපගේ මූලික යුතුකමයි.',
        points: [
            'පාරදෘශ්‍යභාවය හා පූර්ණ විශ්වාසනීයත්වය',
            'සමාජීය අභිවෘද්ධිය සහ සමගිය උදෙසා කැපවීම',
            'අඛණ්ඩ ප්‍රජා සත්කාරක වැඩසටහන්'
        ]
    },
    team: [
        {
            id: 1,
            name: 'සුනිල් විජයානන්ද',
            role: 'සභාපති',
            img: communityMemberImages.sunil,
            quote: '1991 දී මා ආරම්භ කළ මෙම අසරණ සරණ සමිතිය, "සතහට සෙත" තේමාව ඔස්සේ එදා සිට අද දක්වා විශාල සේවාවක් ඉටු කර ඇත. ඉදිරියටත් විවිධ ක්ෂේත්‍ර ඔස්සේ ප්‍රදේශවාසී ජනතාවට සෙත සැලසීම සහ එම සිහිනය සැබෑ කරගැනීම මාගේ එකම අරමුණයි.',
            phone: '+94 77 123 4567'
        },
        {
            id: 2,
            name: 'අරුණ වික්‍රමරත්න',
            role: 'උප සභාපති',
            img: communityMemberImages.aruna,
            quote: 'ප්‍රදේශයේ සියලු ජනතාවගේ සුභසාධනය උදෙසා එක්ව කටයුතු කිරීම අපගේ ප්‍රධාන වගකීමයි.',
            phone: '+94 77 234 5678'
        },
        {
            id: 3,
            name: 'තිලකා කුලසූරිය',
            role: 'ලේකම්',
            img: communityMemberImages.thilaka,
            quote: 'සෑම ජීවිතයකම වටිනාකම හඳුනාගෙන, අත්වැල් බැඳගෙන ගමන් කරමු.',
            phone: '+94 77 345 6789'
        },
        {
            id: 4,
            name: 'අජිත් ජයසූරිය',
            role: 'උප ලේකම්',
            img: communityMemberImages.sunil,
            quote: 'අනාගත පරපුර උදෙසා යහපත් පරිසරයක් සහ අනාගතයක් ගොඩනැගීමට කැපවෙමු.',
            phone: '+94 77 456 7890'
        },
        {
            id: 5,
            name: 'කරුනාතිලක හෙට්ටිආරච්චි',
            role: 'ගරු භාණ්ඩාගාරික',
            img: 'https://ui-avatars.com/api/?name=Karunathilaka+H&background=1e293b&color=cbd5e1&size=256',
            quote: 'විශ්වාසය හා විනිවිදභාවය අප පදනමේ ප්‍රධාන ශක්තියයි.',
            phone: '+94 77 567 8901'
        }
    ],
    projects: [
        {
            id: 1,
            title: 'වාර්ෂික ශිෂ්‍යත්ව ප්‍රදානය - 2023',
            category: 'Education',
            date: '2023 දෙසැම්බර් 15',
            location: 'කුඩාඔය ප්‍රාථමික විද්‍යාලය',
            shortDesc: 'ප්‍රදේශයේ ආර්ථික අපහසුතා ඇති දරුවන් 150 කට අධ්‍යාපන ශිෂ්‍යත්ව සහ පාසල් උපකරණ ලබා දීම.',
            mainImg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
            desc: 'වාර්ෂිකව සංවිධානය කරනු ලබන මෙම ශිෂ්‍යත්ව ප්‍රදානෝත්සවය හරහා ප්‍රදේශයේ දරුවන්ට අවශ්‍ය අභ්‍යාස පොත්, පාසල් බෑග්, සහ මූල්‍ය ශිෂ්‍යත්ව ලබා දෙන ලදී.',
            features: [
                { h: 'ප්‍රතිලාභීන්', p: 'පාසල් දරුවන් 150 කට අධික පිරිසක්' },
                { h: 'ආයෝජනය', p: 'රුපියල් ලක්ෂ 5 කට අධික පාසල් උපකරණ' }
            ],
            gallery: [
                'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop'
            ]
        },
        {
            id: 2,
            title: 'නිදහස් සෞඛ්‍ය කඳවුර',
            category: 'Health',
            date: '2023 අගෝස්තු 20',
            location: 'කුඩාඔය ග්‍රාම සේවා කාර්යාලය',
            shortDesc: 'ගම්වාසීන් 300 කට අධික පිරිසකට නොමිලේ වෛද්‍ය පරීක්ෂණ සහ ඖෂධ ලබා දීම.',
            mainImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
            desc: 'විශේෂඥ වෛද්‍යවරුන්ගේ සහභාගීත්වයෙන් පැවැත්වූ මෙම කඳවුරේදී අක්ෂි පරීක්ෂණ, දන්ත වෛද්‍ය සායන සහ සාමාන්‍ය රෝග සඳහා පරීක්ෂණ සිදු කරන ලදී.',
            features: [
                { h: 'සහභාගීත්වය', p: 'ගම්වාසීන් 300 කට අධික පිරිසක්' },
                { h: 'විශේෂ සේවා', p: 'ඇස් කණ්නාඩි 50 ක් සහ ඖෂධ නොමිලයේ' }
            ],
            gallery: [
                'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=600&auto=format&fit=crop'
            ]
        },
        {
            id: 3,
            title: 'ග්‍රාමීය මාර්ග ප්‍රතිසංස්කරණය',
            category: 'Community',
            date: '2023 ජනවාරි 10',
            location: 'කුඩාඔය මාවත',
            shortDesc: 'ප්‍රජා ශ්‍රමදානයෙන් කිලෝමීටර් 2 ක පමණ ග්‍රාමීය මාර්ගයක් පිළිසකර කිරීම.',
            mainImg: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop',
            desc: 'ගම්වාසීන්ගේ ශ්‍රමදානයෙන් හා අප සංගමයේ මූල්‍ය දායකත්වයෙන් සම්පූර්ණයෙන්ම පිළිසකර කරන ලදී.',
            features: [
                { h: 'දුර ප්‍රමාණය', p: 'කිලෝමීටර් 2 ක මාර්ගයක්' },
                { h: 'ශ්‍රම දායකත්වය', p: 'ගම්වාසීන් 100 කට අධික පිරිසකගේ සහාය' }
            ],
            gallery: [
                'https://images.unsplash.com/photo-1541888086925-920f0bb33877?q=80&w=600&auto=format&fit=crop'
            ]
        }
    ],
    services: [
        {
            id: 1,
            title: 'අධ්‍යාපන සහාය',
            shortDesc: 'දරුවන්ගේ අධ්‍යාපනය සඳහා ශිෂ්‍යත්ව සහ අධ්‍යාපන ද්‍රව්‍ය ලබා දීම',
            longDesc: 'ප්‍රදේශයේ ආර්ථික අපහසුතා ඇති දරුවන්ගේ අධ්‍යාපන කටයුතු සාර්ථක කරගැනීම සඳහා අවශ්‍ය පොත්පත්, පාසල් උපකරණ මෙන්ම විශේෂ ශිෂ්‍යත්ව ලබා දීමේ ව්‍යාපෘතියක් අප මෙහෙයවනු ලබයි.',
            details: [
                { h: "වාර්ෂික ශිෂ්‍යත්ව", p: "උසස් පෙළ සහ සාමාන්‍ය පෙළ සමත් දරුවන් සඳහා මූල්‍ය ආධාර." },
                { h: "පොත්පත් ලබාදීම", p: "නව වසර ආරම්භයේදී පාසල් උපකරණ බෙදාදීම." }
            ],
            bullets: [
                "අමතර පන්ති පැවැත්වීම",
                "වෘත්තීය මාර්ගෝපදේශන සම්මන්ත්‍රණ",
                "පුස්තකාල සඳහා පොත් පරිත්‍යාග කිරීම"
            ]
        },
        {
            id: 2,
            title: 'සෞඛ්‍ය සේවා',
            shortDesc: 'නොමිලේ සෞඛ්‍ය පරීක්ෂණ සහ වෛද්‍ය උපදෙස් ලබා දීම',
            longDesc: 'රෝගී වූ හෝ සෞඛ්‍ය පහසුකම් අඩු වැඩිහිටියන් හා දරුවන් ඉලක්ක කරගෙන නිරන්තරයෙන් වෛද්‍ය කඳවුරු සහ අක්ෂි සායන පවත්වමින් සෞඛ්‍ය නංවාලීමට කටයුතු කරමු.',
            details: [
                { h: "වෛද්‍ය කඳවුරු", p: "විශේෂඥ වෛද්‍යවරුන්ගේ සහභාගීත්වයෙන් නොමිලේ පරීක්ෂණ." },
                { h: "ඖෂධ සැපයීම", p: "දිගුකාලීන රෝගීන් සඳහා අවශ්‍ය ඖෂධ ලබා දීම." }
            ],
            bullets: [
                "ලේ දන් දීමේ කඳවුරු සංවිධානය",
                "අක්ෂි කාච සහ ඇස් කණ්නාඩි ප්‍රදානය",
                "ළමා මන්දපෝෂණය පිටුදැකීමේ වැඩසටහන්"
            ]
        },
        {
            id: 3,
            title: 'ප්‍රජා සංවර්ධනය',
            shortDesc: 'ප්‍රජාව සංවර්ධනය කිරීම සඳහා විවිධ ව්‍යාපෘති ක්‍රියාත්මක කිරීම',
            longDesc: 'අපගේ ගම්මානයේ යටිතල පහසුකම් නැංවීම සහ පිරිසිදු පරිසරයක් නිර්මාණය කිරීම සඳහා අපි ගමේ සියලු දෙනා එක්ව විවිධ ශ්‍රමදාන සහ සංවර්ධන කටයුතු සිදු කරමු.',
            details: [
                { h: "ශ්‍රමදාන ජංගම", p: "පොදු ස්ථාන පිරිසිදු කිරීම සහ මාර්ග ප්‍රතිසංස්කරණය." },
                { h: "පිරිසිදු ජලය", p: "පානීය ජල ව්‍යාපෘති ඇති කිරීම." }
            ],
            bullets: [
                "පන්සල, පාසල වැනි පොදු ස්ථාන අලුත්වැඩියාව",
                "පරිසර සුරැකීමේ සහ ගස් සිටුවීමේ වැඩසටහන්"
            ]
        }
    ],
    memberships: [
        {
            id: 101,
            name: 'කමල් පෙරේරා',
            nic: '199214502390',
            phone: '+94 71 890 1234',
            address: 'නො. 42, පන්සල පාර, කුඩාඔය',
            status: 'Approved',
            date: '2026-09-10'
        },
        {
            id: 102,
            name: 'නිමල් සිරිවර්ධන',
            nic: '198532109845',
            phone: '+94 77 987 6543',
            address: 'ආලෝක මාවත, කුඩාඔය',
            status: 'Pending',
            date: '2026-09-18'
        },
        {
            id: 103,
            name: 'චන්ද්‍රිකා කුමාරි',
            nic: '199578912340',
            phone: '+94 75 456 7891',
            address: 'ගඟ ළඟ පාර, කුඩාඔය',
            status: 'Pending',
            date: '2026-09-19'
        }
    ],
    inquiries: [
        {
            id: 201,
            name: 'සංජීව හේරත්',
            email: 'sanjeewa@gmail.com',
            phone: '+94 77 444 5555',
            message: 'මට මෙම සමිතියට මූල්‍ය පරිත්‍යාගයක් කිරීමට අවශ්‍යයි. විස්තර ලබා දෙන්න.',
            date: '2026-09-19 14:30',
            status: 'Unread'
        },
        {
            id: 202,
            name: 'මාලිනී ප්‍රනාන්දු',
            email: 'malini.p@yahoo.com',
            phone: '+94 71 222 3333',
            message: 'ඊළඟ ලේ දන්දීමේ කඳවුර පවත්වන දිනය දැනගත හැකිද?',
            date: '2026-09-18 10:15',
            status: 'Read'
        }
    ],
    history: {
        title: 'කුඩාඔය අසරණ සරණ සමිතියේ අභිමානවත් ඉතිහාසය',
        subtitle: '1991 සිට වසර 35 කට අධික කාලයක් ප්‍රදේශවාසී ජනතාව උදෙසා ඉටුකළ මෙහෙවර',
        milestones: [
            { year: '1991', title: 'සමිතිය ආරම්භ කිරීම', desc: 'ගම්වාසීන් 15 දෙනෙකුගේ මූලිකත්වයෙන් කුඩාඔය අසරණ සරණ සමිතිය නිල වශයෙන් පිහිටුවීම.' },
            { year: '2000', title: 'පළමු වෛද්‍ය කඳවුර', desc: 'නොමිලේ අක්ෂි හා සාමාන්‍ය වෛද්‍ය පරීක්ෂණ කඳවුරක් සාර්ථකව පැවැත්වීම.' },
            { year: '2012', title: 'ශිෂ්‍යත්ව අරමුදල පිහිටුවීම', desc: 'ආර්ථික අපහසුතා ඇති දරුවන්ට වාර්ෂික ශිෂ්‍යත්ව ලබාදීමේ ව්‍යාපෘතිය ආරම්භ කිරීම.' },
            { year: '2023', title: 'ජිම් සහ ප්‍රජා ශාලාව නවීකරණය', desc: 'නූතන තාක්ෂණයෙන් සහ යටිතල පහසුකම්වලින් යුතුව ප්‍රජා ශාලාව දියුණු කිරීම.' }
        ]
    }
};

export const DataProvider = ({ children }) => {
    const [siteData, setSiteData] = useState(() => {
        const saved = localStorage.getItem('kudaoya_site_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved site data", e);
            }
        }
        return defaultData;
    });

    useEffect(() => {
        localStorage.setItem('kudaoya_site_data', JSON.stringify(siteData));
    }, [siteData]);

    // Helpers to update data
    const updateHero = (updated) => {
        setSiteData(prev => ({ ...prev, hero: { ...prev.hero, ...updated } }));
    };

    const updateAbout = (updated) => {
        setSiteData(prev => ({ ...prev, about: { ...prev.about, ...updated } }));
    };

    const updateHistory = (updated) => {
        setSiteData(prev => ({ ...prev, history: { ...prev.history, ...updated } }));
    };

    // Generic CRUD for arrays (team, projects, services, memberships, inquiries)
    const addArrayItem = (key, item) => {
        setSiteData(prev => ({
            ...prev,
            [key]: [{ id: Date.now(), ...item }, ...prev[key]]
        }));
    };

    const updateArrayItem = (key, id, updatedFields) => {
        setSiteData(prev => ({
            ...prev,
            [key]: prev[key].map(item => item.id === id ? { ...item, ...updatedFields } : item)
        }));
    };

    const deleteArrayItem = (key, id) => {
        setSiteData(prev => ({
            ...prev,
            [key]: prev[key].filter(item => item.id !== id)
        }));
    };

    const resetToDefaults = () => {
        setSiteData(defaultData);
        localStorage.removeItem('kudaoya_site_data');
    };

    return (
        <DataContext.Provider value={{
            siteData,
            updateHero,
            updateAbout,
            updateHistory,
            addArrayItem,
            updateArrayItem,
            deleteArrayItem,
            resetToDefaults
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
