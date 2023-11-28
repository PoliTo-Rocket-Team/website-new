export const addPosition = async (value, supabase) => {
    const {
        division,
        name,
        number,
        description,
        requiredSkills,
        desirableSkills,
        open,
        formLink,
    } = value;
    const dbRespose = await supabase.from("positions").insert({
        division: division,
        number: number,
        name: name,
        description: description,
        required: requiredSkills,
        desirable: desirableSkills,
        open: open,
        form: formLink,
    });

    return dbRespose;
};

export const getPositions = async (supabase, id) => {
    const positions = await supabase
        .from("positions")
        .select()
        .eq("division", id);
    return positions;
};
