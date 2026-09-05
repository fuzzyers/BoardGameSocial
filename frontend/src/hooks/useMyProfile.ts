import { getMyProfile, updateProfileBio } from "@/services/profile";
import { ProfileData } from "@/types/apiDataTypes";
import { useEffect, useState } from "react";

export const useMyProfile = () => {
    const [profile, setProfile] = useState<ProfileData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getMyProfile();

                setProfile(response);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                setError("unable to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const updateProfileDescription = async (newDescription: string) => {
        const response = await updateProfileBio(newDescription);

        console.log("Updated profile description:", response);
        setProfile((prevProfile) => {
            if (!prevProfile) return prevProfile;
            return {
                ...prevProfile,
                description: response.description,
            };
        });
    };

    return { profile, loading, error, updateProfileDescription };
};
