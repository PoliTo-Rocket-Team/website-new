<script>
    import { createEventDispatcher } from "svelte";
    import { Form, Field, ErrorMessage, createForm } from "svelte-forms-lib";
    import * as yup from "yup";
    export let customSubmitForm = values => {
        alert("customSubmitForm not defined");
    };
    export let division;

    export let DatainitialValues = {
        division: division,
        name: "",
        number: "",
        description: "",
        requiredSkills: [""],
        desirableSkills: [""],
        formLink: "",
        open: false,
    };
    export let positions;

    function addEntryIfUnique(newNumber) {
        return !positions?.some(obj => obj.number === newNumber);
    }

    const formProps = {
        initialValues: DatainitialValues,
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            number: yup
                .number()
                .test("check-duplicate", "duplicate number", function (value) {
                    return addEntryIfUnique(value);
                })
                .required(),
            description: yup
                .string()
                .min(40, "Must be more than 40 characters")
                .required(),
            requiredSkills: yup
                .array()
                .of(yup.string().required())
                .min(1)
                .test(
                    "check-duplicate",
                    "At least one required skill is required",
                    function (value) {
                        return !(value?.length === 1 && value[0] === "");
                    }
                ),
            open: yup.boolean().required(),
        }),
        onSubmit: values => {
            customSubmitForm(values);
        },
    };
    const { form, errors, state, handleChange, handleSubmit, handleReset } =
        createForm(formProps);

    const addRequired = () => {
        $form.requiredSkills = $form.requiredSkills.concat("");
        $errors.requiredSkills = $errors.requiredSkills.concat("");
    };

    const removeRequired = i => {
        $form.requiredSkills = $form.requiredSkills.filter((u, j) => j !== i);
        $errors.requiredSkills = $errors.requiredSkills.filter(
            (u, j) => j !== i
        );
    };
    const addDesirable = () => {
        $form.desirableSkills = $form.desirableSkills.concat("");
        $errors.desirableSkills = $errors.desirableSkills.concat("");
    };

    const removeDesirable = i => {
        $form.desirableSkills = $form.desirableSkills.filter((u, j) => j !== i);
        $errors.desirableSkills = $errors.desirableSkills.filter(
            (u, j) => j !== i
        );
    };

    function handelEnter(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            addRequired();
        }
    }

    let dispatch = createEventDispatcher();
    function handelCancel() {
        dispatch("close");
    }
</script>

<div class="main-container">
    <form on:submit|preventDefault={handleSubmit} class="form-container">
        <div class="input-short">
            <label for="name"><strong>Name :</strong></label>
            <input
                type="text"
                name="name"
                id="name"
                on:blur={handleChange}
                on:change={handleChange}
                bind:value={$form.name}
            />
            {#if $errors.name}
                <small class="error">{$errors.name}</small>
            {/if}
        </div>
        <div class="input-short">
            <label for="number"><strong>Number :</strong></label>
            <input
                type="number"
                name="number"
                id="number"
                on:blur={handleChange}
                on:change={handleChange}
                bind:value={$form.number}
            />
            {#if $errors.number}
                <small class="error">{$errors.number}</small>
            {/if}
        </div>
        <div class="input-short">
            <label for="formLink"><strong>Form Link :</strong></label>
            <input
                type="text"
                name="formLink"
                id="formLink"
                on:blur={handleChange}
                on:change={handleChange}
                bind:value={$form.formLink}
            />
            {#if $errors.formLink}
                <small class="error">{$errors.formLink}</small>
            {/if}
        </div>
        <div class="input-short">
            <label for="open"><strong>Open :</strong></label>
            <input
                type="checkbox"
                name="open"
                id="open"
                on:blur={handleChange}
                on:change={handleChange}
                bind:value={$form.open}
            />
            {#if $errors.open}
                <small class="error">{$errors.open}</small>
            {/if}
        </div>

        <div class="input-description">
            <label for="description"><strong>Description :</strong></label>
            <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                on:blur={handleChange}
                on:change={handleChange}
                bind:value={$form.description}
            ></textarea>
            {#if $errors.description}
                <small class="error">{$errors.description}</small>
            {/if}
        </div>

        <div class="array-input">
            <div class="array-input-header">
                <h3>Required Skills</h3>
                <span class="btn" on:click={addRequired}>Add</span>
            </div>
            {#if $errors.requiredSkills}
                <small class="error">{$errors.requiredSkills}</small>
            {/if}
            <div class="input-short-container">
                <ol>
                    {#each $form.requiredSkills as skill, i}
                        <li>
                            <div class="input-short">
                                <input
                                    type="text"
                                    id="requiredSkills"
                                    placeholder="Enter Required Skill here"
                                    on:keydown={handelEnter}
                                    bind:value={$form.requiredSkills[i]}
                                />
                                {#if $form.requiredSkills.length !== 1}
                                    <span
                                        class="btn"
                                        on:click={() => removeRequired(i)}
                                        >Remove</span
                                    >
                                {/if}
                            </div>
                        </li>
                    {/each}
                </ol>
            </div>

            <br />

            <div class="array-input">
                <div class="array-input-header">
                    <h3>Desirable Skills</h3>
                    <span class="btn" on:click={addDesirable}>Add</span>
                </div>
                {#if $errors.desirableSkills}
                    <small class="error">{$errors.desirableSkills}</small>
                {/if}
                <div class="input-short-container">
                    <ol>
                        {#each $form.desirableSkills as skill, i}
                            <li>
                                <div class="input-short">
                                    <input
                                        type="text"
                                        id="desirableSkills"
                                        placeholder="Enter Desirable Skill here"
                                        on:keydown={handelEnter}
                                        bind:value={$form.desirableSkills[i]}
                                    />
                                    {#if $form.desirableSkills.length !== 1}
                                        <span
                                            class="btn"
                                            on:click={() => removeDesirable(i)}
                                            >Remove</span
                                        >
                                    {/if}
                                </div>
                            </li>
                        {/each}
                    </ol>
                </div>

                <div class="form-btn">
                    <button class="btn" type="submit" on:click={handleSubmit}
                        >Submit</button
                    >
                    <button class="btn" type="reset" on:click={handleReset}
                        >Reset</button
                    >
                    <button on:click={handelCancel} class="btn">Cancel</button>
                </div>
            </div>
        </div>
    </form>
</div>

<style>
    .main-container {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    :global(.form-container) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .input-short {
        display: flex;
        flex-wrap: nowrap;
        gap: 0.5rem;
    }

    .input-short-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .input-description {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        resize: none;
    }

    .array-input {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .array-input input {
        min-width: 15rem;
    }
    .form-btn {
        display: flex;
        justify-content: center;

        gap: 1rem;
    }

    .array-input-header {
        display: flex;
        gap: 1rem;
    }
    ol {
        padding: 1rem;
    }
    li {
        margin: 0.5rem 0;
    }
    strong {
        white-space: nowrap;
    }

    textarea {
        resize: none;
    }

    .error {
        color: red;
    }
</style>
