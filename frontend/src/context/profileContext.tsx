import { createContext, useContext, useEffect, useState } from "react";
import { getMyProfile, updateProfileBio } from "@/services/profile";
import { ProfileData } from "@/types/apiDataTypes";

type ProfileContextType = {
    profile: ProfileData | null;
    loading: boolean;
    error: string | null;
    refreshProfile: () => Promise<void>;
    updateTop3Game: (position: 1 | 2 | 3, game: ProfileData["top3_games"][number]) => void;
    updateProfileDescription: (newDescription: string) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getMyProfile();

            setProfile(data);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            setError("Unable to load profile.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshProfile();
    }, []);

    const updateTop3Game = (position: 1 | 2 | 3, game: ProfileData["top3_games"][number]) => {
        setProfile((prevProfile) => {
            if (!prevProfile) return prevProfile;

            const top3Games = [...prevProfile.top3_games];

            top3Games[position - 1] = game;

            return {
                ...prevProfile,
                top3_games: top3Games,
            };
        });
    };

    const updateProfileDescription = async (newDescription: string) => {
        const response = await updateProfileBio(newDescription);

        setProfile((prevProfile) => {
            if (!prevProfile) return prevProfile;

            return {
                ...prevProfile,
                description: response.description,
            };
        });
    };

    return (
        <ProfileContext.Provider
            value={{
                profile,
                loading,
                error,
                refreshProfile,
                updateTop3Game,
                updateProfileDescription,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error("useProfile must be used inside ProfileProvider");
    }

    return context;
};
