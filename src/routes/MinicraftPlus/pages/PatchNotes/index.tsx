import LoadingSpinner from "@frontend/components/LoadingSpinner";
import PatchNoteDialog from "@frontend/routes/MinicraftPlus/pages/PatchNotes/components/PatchNoteDialog";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import "./index.scss";

export interface PatchNote {
  id: string;
  version: string;
  title: string;
  image: string;
  body: string;
}

export const PatchNoteCard: React.FC<{
  patch: PatchNote;
  onCardClick: (id: string) => void;
}> = ({ patch, onCardClick }) => {
  return (
    <button className="patch-card" onClick={() => onCardClick(patch.id)}>
      <div className="card-inside">
        <div className="card-top">
          <img src={patch.image} alt={patch.title} />
        </div>
        <div className="card-bottom">{patch.title}</div>
      </div>
    </button>
  );
};

const PatchNotes = () => {
  const [showPatchDialog, setShowPatchDialog] = useState(false);
  const [noteSelected, setNoteSelected] = useState<null | PatchNote>(null);
  const [patchNotes, setPatchNotes] = useState<PatchNote[]>([]);

  useEffect(() => {
    if (patchNotes.length === 0) {
      invoke("get_minicraftplus_patch_notes").then((d) => {
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
