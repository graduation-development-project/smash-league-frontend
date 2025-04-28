import ScoreboardApp from '@/components/general/organisms/score/scoreboard-app';
import ScorePage from '@/components/pages/score/score.page';
import React from 'react';

const Score = () => {
  // return <ScorePage />;
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Badminton & Pickleball Scoreboard</h1>
        <ScoreboardApp />
      </div>
    </main>
  )
};

export default Score;
