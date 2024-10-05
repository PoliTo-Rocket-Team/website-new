<script lang="ts">
    import { save } from "./validation";

    export let requester;
    export let supabase;

    let dialog: HTMLDialogElement;
    function openDialog() {
        dialog.show();
    }

    function closeDialog() {
        dialog.close();
    }
    const submit = async e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const res = await save(formData, supabase);
        console.log(res);
        dialog.close();
    };
</script>

<div class="dialog-container">
    <button class="btn" on:click={openDialog}>Add Order</button>

    <dialog bind:this={dialog}>
        <h2>Form</h2>
        <form class="form-container" on:submit={submit}>
            <input type="hidden" name="requester" value={requester} />

            <label for="description"
                >description
                <input type="text" name="description" id="description" />
            </label>
            <label for="quantity"
                >quantity
                <input type="number" name="quantity" id="quantity" />
            </label>
            <label for="price"
                >price
                <input type="number" name="price" id="price" />
            </label>

            <label for="status"
                >status
                <input type="text" name="status" id="status" />
            </label>
            <label for="reason"
                >reason
                <input type="textarea" name="reason" id="reason" />
            </label>
            <label for="Quote"
                >Quote*
                <input class="" type="file" name="Quote" id="Quote" />
            </label>

            <div class="btn-container">
                <button type="submit" class="btn">Save</button>

                <button type="button" class="btn" on:click={closeDialog}
                    >Close</button
                >
            </div>
        </form>
    </dialog>
</div>

<style>
    .dialog-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    dialog {
        border: none;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }
    .form-container {
        height: auto;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .btn-container {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }
</style>
