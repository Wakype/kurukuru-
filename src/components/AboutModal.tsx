import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AboutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass bg-black/40 text-purple-50 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-3xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="outfit-font text-2xl tracking-wider glow-text">
            ABOUT THIS WEB
          </DialogTitle>
          <DialogDescription className="hidden">About Modal</DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-3 text-purple-200/80 font-light">
          <p>
            This site is a total waste of time; I don't know why, but I like it.
            Lmao.
          </p>
          <p>Herta is a character from Honkai Star Rail.</p>
        </div>
        <DialogFooter className="sm:justify-between items-center mt-2 border-t border-white/10 pt-4">
          <p className="text-left text-xs text-purple-300/50">
            All rights® belong to HOYOVERSE
          </p>
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
