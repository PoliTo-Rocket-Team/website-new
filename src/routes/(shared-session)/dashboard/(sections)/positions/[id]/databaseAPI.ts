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
    // console.log("inside add position", value);
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
