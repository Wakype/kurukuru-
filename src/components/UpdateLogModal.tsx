import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function UpdateLogModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass bg-black/40 text-purple-50 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-3xl sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="outfit-font text-2xl tracking-wider glow-text">
            UPDATE LOG
          </DialogTitle>
          <DialogDescription className="hidden">
            Update details
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="mb-8 border-l-2 border-hud-fuchsia pl-4">
            <h2 className="outfit-font text-xl font-medium mb-3 text-fuchsia-200">
              v1.2
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-2 text-fuchsia-100/70 font-light text-sm">
              <li>
                <span className="text-hud-fuchsia font-medium">✨ NEW ✨</span>{" "}
                Complete UI redesign.
              </li>
              <li>Added a sparkling Cursor Trail and Parallax effect.</li>
              <li>
                Added{" "}
                <span className="font-bold text-white shadow-fuchsia-500/50">
                  Combo Multiplier
                </span>{" "}
                for fast clicking.
              </li>
              <li>
                Added 5 new Achievements:
                <ul className="list-circle list-inside ml-2 mt-1 text-xs text-purple-200/60 font-mono">
                  <li>Herta Enthusiast (10)</li>
                  <li>Kuru Kuru Appreciator (50)</li>
                  <li>Genius Society Member (100)</li>
                  <li>Peerless Gem (500)</li>
                  <li>Unrivaled Legend (1000)</li>
                </ul>
              </li>
              <li>
                🎵 BGM Track by:{" "}
                <span className="font-medium text-purple-300">
                  "Kuru Kuru Kururin - Raphiiel"
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-4 border-l-2 border-white/20 pl-4 opacity-50">
            <h2 className="outfit-font text-lg font-medium mb-3 text-purple-300">
              v1.1 & v1.0
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-1 text-purple-100/50 font-light text-xs">
              <li>
                Mobile responsiveness and initial character implementation.
              </li>
            </ul>
          </div>
        </div>
        <DialogFooter className="sm:justify-end mt-4 border-t border-white/10 pt-4">
          <Button
            onClick={onClose}
            className="outfit-font bg-purple-700/50 hover:bg-purple-600/60 text-purple-50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-500/30 font-medium tracking-widest px-8 transition-all duration-300 uppercase rounded-xl"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
