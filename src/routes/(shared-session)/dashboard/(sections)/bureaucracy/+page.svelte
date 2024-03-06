<script>
    import "@fontsource/anonymous-pro/400.css";
    import DocCard from "./DocCard.svelte";
    import DefineIcons from "$lib/icons/DefineIcons.svelte";
</script>

<svelte:head>
    <title>Bureaucracy | PRT Admin Program</title>
</svelte:head>

<h1>Bureaucracy</h1>

<h2>Procedures</h2>

<details>
    <summary>
        <h3>Recruitment and onboarding</h3>
    </summary>
    <ol>
        <li>
            The Leads responsible for the selection of new members will identify
            candidates and provide them with the necessary documents. The Leads
            will send the link to the <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSes5438q7h43gOyUeb9B-PgbIcor2AyFeocyksHlzsorhOzBw/viewform"
                target="_blank">registry form</a
            > and the Non-Disclosure Agreement (NDA) document (already pre-signed
            by the PoliTo Rocket Team’s President) to selected individuals. It is
            crucial to ensure that the candidates receive both the registry form
            and the NDA.
        </li>
        <li>
            The Leads will ensure that the new members fill out the registry
            form in its entirety and accurately sign the NDA. The new member(s)
            must send the signed NDA via email to the Recruitment Manager at
            <a href="mailto:recruitment@politorocketteam.it"
                >recruitment@politorocketteam.it</a
            >, with
            <a href="mailto:info@politorocketteam.it"
                >info@politorocketteam.it</a
            > in Carbon Copy (CC) to ensure proper receipt and record-keeping.
        </li>
        <li>
            The Recruitment Manager will be responsible for verifying the
            correctness of the NDA and reviewing the responses on the registry
            form. If the NDA and form are correct and complete, the Recruitment
            Manager will add the new members to the Team’s <a
                href="https://docs.google.com/spreadsheets/d/1Ncalg8rljAv3aFhQ62oZk2ghBPrLs1m4RgFd_32vCOA/edit?usp=sharing"
                >registry sheet</a
            >, updating the records accordingly. The Recruitment Manager will
            also store the signed NDA in the appropriate folder on Google Drive,
            ensuring its secure storage and easy access for future reference.
            The NDA documents must be saved in PDF format and renamed
            <span class="mono">LASTNAME FIRSTNAME NDA.pdf</span>.
        </li>
        <li>
            After the new members have been officially registered, the
            Recruitment Manager will send a welcome email to each new member.
            The email will include a warm welcome message and provide the link
            to join the Team’s designated communication platform, the Discord
            server. The invitation link must be temporary, of maximum 7 days.
            The email must have
            <a href="mailto:info@politorocketteam.it"
                >info@politorocketteam.it</a
            > in Carbon Copy (CC) to ensure proper receipt and record-keeping. This
            step ensures that the new members can easily integrate into the team’s
            communication channels.
        </li>
        <li>
            Once the new members have joined the Team’s Discord server, they
            will initially be placed in the sorting channel, where they will not
            be able to read or write anything. The individual(s) responsible for
            managing Discord (as of 2023 the Recruitment Manager) will assign
            each new member their correct role within the team. This role
            assignment will grant them access to the relevant text and voice
            channels, enabling them to participate in team discussions and
            collaborate effectively.
        </li>
        <li>
            The direct superior to the new members, typically their Division
            Lead, will have the responsibility of sharing the necessary files
            and folders from all file sharing platforms used by the Team, such
            as Google Drive, with the new 2 PoliTo Rocket Team Politecnico di
            Torino members. This step ensures that the new members have access
            to the rele- vant resources and materials required for their
            assigned tasks. The superior should promptly grant access to the
            appropriate files and folders, facilitating a seamless integration
            of the new members into the team’s workflow.
        </li>
    </ol>
</details>

<details>
    <summary>
        <h3>Member resignation</h3>
    </summary>
    <ol>
        <li>
            The member(s) who have decided to quit the PoliTo Rocket Team must
            initiate the process by officially notifying their direct superior
            within the Team, e.g. their Division Lead. This can be done either
            via email or through the designated communication platform agreed
            upon within the Team (Discord).
        </li>
        <li>
            Upon receiving the notification, the direct superior of the
            quitter(s) will be re- sponsible for informing the Human Resources
            specialist (as of 2023 the Recruitment Manager) by email at
            <a href="mailto:recruitment@politorocketteam.it"
                >recruitment@politorocketteam.it</a
            > about the resignation(s). The direct superior should provide the necessary
            details, including the full name(s) of the quitter(s), to ensure accurate
            and timely record- keeping.
        </li>
        <li>
            The Recruitment Manager will then take immediate action to remove
            the quitter(s) from the official Team’s
            <a
                href="https://docs.google.com/spreadsheets/d/1Ncalg8rljAv3aFhQ62oZk2ghBPrLs1m4RgFd_32vCOA/edit?usp=sharing"
                target="_blank">registry sheet</a
            >.
        </li>
        <li>
            The individual(s) responsible for managing Discord (as of 2023 the
            Recruitment Manager) will then proceed to remove the Discord role
            from the quitter(s) profile. Only after that this step has been
            completed, the Recruitment Manager will then proceed to remove
            quitter(s) from the platform by kicking or banning them from the
            server.
        </li>
        <li>
            The Lead who supervised the quitter(s) has the responsibility of
            removing the quitter(s) account(s) from all file sharing platforms
            used by the Team, such as Google Drive. The Lead must thoroughly
            review the shared files and directories to ensure that no
            confidential or sensitive information is being shared with the
            quitter(s). A guide on how to find files that have been shared to a
            specific person on Google Drive can be found <a
                href="https://support.google.com/drive/answer/2375114?sjid=10290732754056045397-EU#zippy=%2Cfilter-your-drive-results"
                target="_blank">here</a
            >.
        </li>
    </ol>
</details>

<h2>Documents</h2>

<div class="cards">
    <DocCard
        name="Hazardous Materials Management Regulation"
        url="hazard-regulation"
        icon="hazard"
    />
    <DocCard
        name="Meetings Planning Guidelines"
        url="room-booking"
        icon="calendar"
    />
    <DocCard name="VES Subteam Guide" url="VES-guide" icon="document" />
    <DocCard name="EFS Subteam Guide" url="EFS-guide" icon="document" />
    <DocCard name="Non-Disclosure Agreement" url="NDA" icon="handshake" />
</div>

<DefineIcons />

<style>
    h2 {
        margin-bottom: 2rem;
    }
    h3 {
        font-size: var(--fs-60);
        display: inline;
    }
    summary {
        margin-top: 2.5rem;
        margin-bottom: 1rem;
    }
    ol {
        padding-left: 2ch;
        max-width: 60ch;
    }
    li {
        margin-top: 0.5rem;
    }
    li::marker {
        color: var(--accent-text);
    }
    .mono {
        font-family: "Anonymous Pro", monospace;
        padding-inline: 0.5ch;
        border-radius: 0.2ch;
        background-color: var(--bg-1);
    }
    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 1.2rem;
    }
</style>
