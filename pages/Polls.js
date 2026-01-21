import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format, isPast, parseISO } from 'date-fns';
import {
  Vote,
  CheckCircle2,
  Clock,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function Polls() {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: polls = [], isLoading } = useQuery({
    queryKey: ['polls'],
    queryFn: () => base44.entities.Poll.list('-created_date', 100),
  });

  const voteMutation = useMutation({
    mutationFn: async ({ pollId, optionIndex }) => {
      const poll = polls.find(p => p.id === pollId);
      if (!poll) throw new Error('Poll not found');

      const updatedOptions = poll.options.map((opt, idx) => ({
        ...opt,
        votes: idx === optionIndex ? (opt.votes || 0) + 1 : (opt.votes || 0)
      }));

      const updatedVoters = [...(poll.voters || []), user.id];

      return base44.entities.Poll.update(pollId, {
        options: updatedOptions,
        voters: updatedVoters,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polls'] });
      setSelectedPoll(null);
      setSelectedOption(null);
    },
  });

  const handleVote = () => {
    if (selectedPoll && selectedOption !== null) {
      voteMutation.mutate({ pollId: selectedPoll.id, optionIndex: selectedOption });
    }
  };

  const hasVoted = (poll) => {
    return poll.voters?.includes(user?.id);
  };

  const isExpired = (poll) => {
    return poll.expires_at && isPast(parseISO(poll.expires_at));
  };

  const activePolls = polls.filter(p => !isExpired(p) && p.status === 'active');
  const closedPolls = polls.filter(p => isExpired(p) || p.status === 'closed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Community Polls</h1>
        <p className="text-slate-500 mt-1">Vote on community decisions and surveys</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium text-slate-500 flex items-center gap-2">
          <Vote className="w-4 h-4" />
          Active Polls
        </h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-2/3 mb-3" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : activePolls.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
            <Vote className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No active polls at the moment</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {activePolls.map((poll) => (
              <PollCard 
                key={poll.id} 
                poll={poll}
                hasVoted={hasVoted(poll)}
                onVote={() => {
                  setSelectedPoll(poll);
                  setSelectedOption(null);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {closedPolls.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Closed Polls
          </h2>
          <div className="grid gap-4">
            {closedPolls.map((poll) => (
              <PollCard 
                key={poll.id} 
                poll={poll}
                hasVoted={hasVoted(poll)}
                isClosed
              />
            ))}
          </div>
        </div>
      )}

      <Dialog open={!!selectedPoll} onOpenChange={() => setSelectedPoll(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedPoll?.question}</DialogTitle>
            {selectedPoll?.description && (
              <DialogDescription>{selectedPoll.description}</DialogDescription>
            )}
          </DialogHeader>
          
          <div className="space-y-4">
            <RadioGroup 
              value={selectedOption?.toString()} 
              onValueChange={(v) => setSelectedOption(parseInt(v))}
            >
              {selectedPoll?.options?.map((option, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                    selectedOption === index 
                      ? "border-emerald-500 bg-emerald-50" 
                      : "border-slate-200 hover:border-slate-300"
                  )}
                  onClick={() => setSelectedOption(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {selectedPoll?.expires_at && (
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Expires {format(parseISO(selectedPoll.expires_at), 'MMMM d, yyyy')}
              </p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setSelectedPoll(null)}>
                Cancel
              </Button>
              <Button 
                onClick={handleVote}
                disabled={selectedOption === null || voteMutation.isPending}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {voteMutation.isPending ? 'Submitting...' : 'Submit Vote'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PollCard({ poll, hasVoted, onVote, isClosed }) {
  const totalVotes = poll.options?.reduce((sum, opt) => sum + (opt.votes || 0), 0) || 0;
  
  return (
    <div className={cn(
      "bg-white rounded-2xl p-6 shadow-sm border border-slate-100",
      isClosed && "opacity-75"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-slate-900">{poll.question}</h3>
            {hasVoted && (
              <Badge className="bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Voted
              </Badge>
            )}
            {isClosed && (
              <Badge variant="secondary">Closed</Badge>
            )}
          </div>
          {poll.description && (
            <p className="text-sm text-slate-500 mb-4">{poll.description}</p>
          )}
        </div>
        {!isClosed && !hasVoted && onVote && (
          <Button onClick={onVote} className="bg-emerald-600 hover:bg-emerald-700">
            Vote Now
          </Button>
        )}
      </div>

      {(hasVoted || isClosed) && (
        <div className="space-y-3 mt-4">
          {poll.options?.map((option, index) => {
            const percentage = totalVotes > 0 ? Math.round((option.votes || 0) / totalVotes * 100) : 0;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{option.text}</span>
                  <span className="font-medium text-slate-900">{percentage}%</span>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-slate-400">{option.votes || 0} votes</p>
              </div>
            );
          })}
          <p className="text-sm text-slate-500 pt-2">
            Total: {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {poll.expires_at && !isClosed && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          Expires {format(parseISO(poll.expires_at), 'MMMM d, yyyy')}
        </div>
      )}
    </div>
  );
}