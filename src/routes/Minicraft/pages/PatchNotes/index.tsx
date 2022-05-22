import LoadingSpinner from "@frontend/components/LoadingSpinner";
import {
  PatchNote,
  PatchNoteCard,
} from "@frontend/routes/MinicraftPlus/pages/PatchNotes";
import PatchNoteDialog from "@frontend/routes/MinicraftPlus/pages/PatchNotes/components/PatchNoteDialog";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

const PatchNotes = () => {
  const [showPatchDialog, setShowPatchDialog] = useState(false);
  const [noteSelected, setNoteSelected] = useState<null | PatchNote>(null);
  const [patchNotes, setPatchNotes] = useState<PatchNote[]>([]);

  useEffect(() => {
    if (patchNotes.length === 0) {
      invoke("get_minicraft_patch_notes").then((d) => {
        setPatchNotes((d as { entries: PatchNote[] }).entries);
      });
    }
  }, []);

  return (
    <div className="sub-page">
      {noteSelected !== null && (
        <PatchNoteDialog
          onClose={() => setShowPatchDialog(false)}
          isOpen={showPatchDialog}
          patch={noteSelected}
        />
      )}
      {patchNotes.length === 0 && <LoadingSpinner message="" />}
      <div className="patch-list">
        {patchNotes.map((pn) => (
          <PatchNoteCard
            key={pn.id}
            patch={pn}
            onCardClick={() => {
              setNoteSelected(pn ?? null);
              setShowPatchDialog(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PatchNotes;
