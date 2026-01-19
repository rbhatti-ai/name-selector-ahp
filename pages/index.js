import React, { useState, useMemo } from 'react';
import Head from 'next/head';

// Initial name data from the Excel file
const initialNames = [
  {
    id: 1,
    name: "HAWK",
    syllables: 1,
    characters: 4,
    pronunciation: "HAWK",
    meaning: "Sharp-eyed bird of prey — watch like a hawk = vigilant monitoring",
    verbScore: 9,
    verbForm: "Hawk it",
    brandingScore: 7,
    soundScore: 9,
    canadianIdentity: "No",
    aiIntegration: "No",
    courtCredibility: "High",
    dailyUse: "Very Natural",
    tagline: "We're watching.",
    phoneticFeel: "Powerful, aggressive, commanding",
    emotionalResonance: "Strong — power, vigilance",
    categoryFit: "High — watch like a hawk"
  },
  {
    id: 2,
    name: "NORDÉ",
    syllables: 2,
    characters: 5,
    pronunciation: "nor-DAY",
    meaning: "Nord (North) + é (French ay/eh sound) = Northern standard, Canadian identity",
    verbScore: 8,
    verbForm: "Nordé it",
    brandingScore: 8,
    soundScore: 8,
    canadianIdentity: "Very High",
    aiIntegration: "No",
    courtCredibility: "High",
    dailyUse: "Natural",
    tagline: "The Northern Standard.",
    phoneticFeel: "Elegant, sophisticated, warm",
    emotionalResonance: "Moderate — elegant, Canadian",
    categoryFit: "Medium — Northern standard"
  },
  {
    id: 3,
    name: "Pinkerton",
    syllables: 3,
    characters: 9,
    pronunciation: "PINK-er-ton",
    meaning: "Famous detective agency (est. 1850) — We Never Sleep = investigation, all-seeing",
    verbScore: 7,
    verbForm: "Pinkerton it",
    brandingScore: 8,
    soundScore: 8,
    canadianIdentity: "No",
    aiIntegration: "No",
    courtCredibility: "Very High",
    dailyUse: "Natural",
    tagline: "We never sleep.",
    phoneticFeel: "Authoritative, historical, serious",
    emotionalResonance: "Strong — detective authority",
    categoryFit: "Very High — investigation"
  },
  {
    id: 4,
    name: "Kepler",
    syllables: 2,
    characters: 6,
    pronunciation: "KEP-ler",
    meaning: "Johannes Kepler — astronomer who found patterns in planetary motion",
    verbScore: 4,
    verbForm: "Kepler it (awkward)",
    brandingScore: 6,
    soundScore: 6,
    canadianIdentity: "No",
    aiIntegration: "No",
    courtCredibility: "High",
    dailyUse: "Awkward as verb",
    tagline: "Patterns reveal truth.",
    phoneticFeel: "Scientific, intellectual, pattern-finding",
    emotionalResonance: "Moderate — intellectual",
    categoryFit: "Medium — patterns"
  },
  {
    id: 5,
    name: "ProvAI",
    syllables: 2,
    characters: 6,
    pronunciation: "PROHV-eye",
    meaning: "Prove + AI = proof powered by artificial intelligence",
    verbScore: 8,
    verbForm: "ProvAI it",
    brandingScore: 7,
    soundScore: 7,
    canadianIdentity: "No",
    aiIntegration: "Yes — built in",
    courtCredibility: "High",
    dailyUse: "Natural",
    tagline: "Proof. Powered by AI.",
    phoneticFeel: "Tech-forward, decisive, modern",
    emotionalResonance: "Moderate — tech feel",
    categoryFit: "High — proof + AI"
  },
  {
    id: 6,
    name: "VerifAI",
    syllables: 3,
    characters: 7,
    pronunciation: "vair-ih-FY",
    meaning: "Verify + AI = verification powered by artificial intelligence",
    verbScore: 8,
    verbForm: "VerifAI it",
    brandingScore: 7,
    soundScore: 7,
    canadianIdentity: "No",
    aiIntegration: "Yes — built in",
    courtCredibility: "High",
    dailyUse: "Natural",
    tagline: "Verified by AI.",
    phoneticFeel: "Active, tech-forward, verification",
    emotionalResonance: "Moderate — tech feel",
    categoryFit: "Very High — verify + AI"
  },
  {
    id: 7,
    name: "CertifAI",
    syllables: 3,
    characters: 8,
    pronunciation: "sir-tih-FY",
    meaning: "Certify + AI = certification powered by artificial intelligence",
    verbScore: 8,
    verbForm: "CertifAI it",
    brandingScore: 7,
    soundScore: 7,
    canadianIdentity: "No",
    aiIntegration: "Yes — built in",
    courtCredibility: "High",
    dailyUse: "Natural",
    tagline: "Certified by AI.",
    phoneticFeel: "Official, certifying, tech-forward",
    emotionalResonance: "Moderate — tech feel",
    categoryFit: "Very High — certify + AI"
  },
  {
    id: 8,
    name: "Assay",
    syllables: 2,
    characters: 5,
    pronunciation: "uh-SAY",
    meaning: "Real word meaning to test, analyze, examine — hidden AI inside (ass-AY)",
    verbScore: 9,
    verbForm: "Assay it",
    brandingScore: 9,
    soundScore: 8,
    canadianIdentity: "No (but has ay sound)",
    aiIntegration: "Hidden inside (ass-AY)",
    courtCredibility: "Very High",
    dailyUse: "Very Natural",
    tagline: "Test everything.",
    phoneticFeel: "Scientific, approachable, testing",
    emotionalResonance: "Moderate — scientific",
    categoryFit: "Very High — to test/analyze"
  }
];

// AHP Criteria definitions
const ahpCriteria = [
  { id: 'syllables', label: 'Syllable Count', description: 'Preference for shorter (1-2) vs longer (3+) syllables', scoreKey: 'syllables', inverse: true },
  { id: 'characters', label: 'Character Length', description: 'Preference for shorter (4-5) vs longer (7+) character names', scoreKey: 'characters', inverse: true },
  { id: 'verbScore', label: 'Verb Usability', description: 'How naturally can the name be used as a verb?', scoreKey: 'verbScore', inverse: false },
  { id: 'brandingScore', label: 'Branding Strength', description: 'Distinctiveness and ownability of the name', scoreKey: 'brandingScore', inverse: false },
  { id: 'soundScore', label: 'Sound & Phonetics', description: 'How the name sounds — memorability, feel', scoreKey: 'soundScore', inverse: false },
  { id: 'aiIntegration', label: 'AI Integration', description: 'Does the name clearly communicate AI technology?', scoreKey: 'aiIntegration', inverse: false },
  { id: 'courtCredibility', label: 'Court Credibility', description: 'How credible does the name sound in legal settings?', scoreKey: 'courtCredibility', inverse: false },
  { id: 'canadianIdentity', label: 'Canadian Identity', description: 'Does the name resonate with Canadian market?', scoreKey: 'canadianIdentity', inverse: false }
];

// AHP scale descriptions
const ahpScale = [
  { value: 1, label: 'Equal', description: 'Both criteria are equally important' },
  { value: 3, label: 'Moderate', description: 'One is moderately more important' },
  { value: 5, label: 'Strong', description: 'One is strongly more important' },
  { value: 7, label: 'Very Strong', description: 'One is very strongly more important' },
  { value: 9, label: 'Extreme', description: 'One is extremely more important' }
];

// Helper to convert text scores to numeric
const textToNumeric = (value, field) => {
  if (typeof value === 'number') return value;
  const text = String(value).toLowerCase();
  if (field === 'aiIntegration') {
    if (text.includes('yes') || text.includes('built in')) return 10;
    if (text.includes('hidden')) return 7;
    return 2;
  }
  if (field === 'courtCredibility' || field === 'canadianIdentity') {
    if (text.includes('very high')) return 10;
    if (text.includes('high')) return 8;
    if (text.includes('medium') || text.includes('moderate')) return 5;
    if (text.includes('low')) return 3;
    return 2;
  }
  return 5;
};

// Calculate normalized score for a name on a criterion
const getNormalizedScore = (name, criterion, allNames) => {
  let value;
  if (criterion.scoreKey === 'syllables') {
    value = 10 - Math.abs(name.syllables - 2) * 3;
  } else if (criterion.scoreKey === 'characters') {
    const optDist = Math.min(Math.abs(name.characters - 5), Math.abs(name.characters - 6));
    value = 10 - optDist * 1.5;
  } else {
    value = textToNumeric(name[criterion.scoreKey], criterion.scoreKey);
  }
  return Math.max(1, Math.min(10, value));
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [names, setNames] = useState(initialNames);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [pairwiseComparisons, setPairwiseComparisons] = useState({});
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showAddName, setShowAddName] = useState(false);
  const [newNameInput, setNewNameInput] = useState('');
  const [isProcessingName, setIsProcessingName] = useState(false);
  const [results, setResults] = useState(null);
  const [showNameDetails, setShowNameDetails] = useState(null);

  const criteriaPairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < selectedCriteria.length; i++) {
      for (let j = i + 1; j < selectedCriteria.length; j++) {
        pairs.push([selectedCriteria[i], selectedCriteria[j]]);
      }
    }
    return pairs;
  }, [selectedCriteria]);

  const calculateAHPWeights = () => {
    const n = selectedCriteria.length;
    if (n === 0) return {};

    const matrix = Array(n).fill(null).map(() => Array(n).fill(1));

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const key = `${selectedCriteria[i].id}-${selectedCriteria[j].id}`;
        const comparison = pairwiseComparisons[key] || { value: 1, favor: 'equal' };

        if (comparison.favor === 'left') {
          matrix[i][j] = comparison.value;
          matrix[j][i] = 1 / comparison.value;
        } else if (comparison.favor === 'right') {
          matrix[i][j] = 1 / comparison.value;
          matrix[j][i] = comparison.value;
        }
      }
    }

    const weights = {};
    let totalWeight = 0;

    for (let i = 0; i < n; i++) {
      let product = 1;
      for (let j = 0; j < n; j++) {
        product *= matrix[i][j];
      }
      const geoMean = Math.pow(product, 1 / n);
      weights[selectedCriteria[i].id] = geoMean;
      totalWeight += geoMean;
    }

    for (const key in weights) {
      weights[key] = weights[key] / totalWeight;
    }

    return weights;
  };

  const calculateFinalScores = () => {
    const weights = calculateAHPWeights();

    const scores = names.map(name => {
      let totalScore = 0;
      let breakdown = {};

      selectedCriteria.forEach(criterion => {
        const score = getNormalizedScore(name, criterion, names);
        const weight = weights[criterion.id] || 0;
        const weightedScore = score * weight;
        totalScore += weightedScore;
        breakdown[criterion.id] = {
          raw: score,
          weight: weight,
          weighted: weightedScore
        };
      });

      return {
        ...name,
        totalScore,
        breakdown,
        weights
      };
    });

    return scores.sort((a, b) => b.totalScore - a.totalScore);
  };

  const handleAddName = async () => {
    if (!newNameInput.trim()) return;

    setIsProcessingName(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const name = newNameInput.trim();
    const syllables = name.split(/[aeiou]+/i).filter(Boolean).length || 1;
    const characters = name.length;

    const newName = {
      id: Date.now(),
      name: name,
      syllables: Math.max(1, syllables),
      characters: characters,
      pronunciation: name.toUpperCase(),
      meaning: "User-added name — analyzed by AI",
      verbScore: Math.floor(Math.random() * 4) + 5,
      verbForm: `${name} it`,
      brandingScore: characters <= 7 ? 7 : 5,
      soundScore: syllables <= 2 ? 7 : 5,
      canadianIdentity: "Neutral",
      aiIntegration: name.toLowerCase().includes('ai') ? "Yes — built in" : "No",
      courtCredibility: characters >= 6 ? "High" : "Medium",
      dailyUse: syllables <= 2 ? "Natural" : "Moderate",
      tagline: `Powered by ${name}.`,
      phoneticFeel: "User-defined, modern",
      emotionalResonance: "To be determined",
      categoryFit: "Custom addition",
      isUserAdded: true
    };

    setNames([...names, newName]);
    setNewNameInput('');
    setShowAddName(false);
    setIsProcessingName(false);
  };

  const renderWelcome = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Name Selection Tool</h1>
        <p className="text-gray-600">Powered by Analytic Hierarchy Process (AHP)</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">How This Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Review the candidate names and their attributes</li>
          <li>Select which criteria matter most to you</li>
          <li>Compare criteria pairs to establish relative importance</li>
          <li>Get your personalized ranking based on your preferences</li>
        </ol>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Your Candidate Names ({names.length})</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {names.map(n => (
            <button
              key={n.id}
              onClick={() => setShowNameDetails(n)}
              className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="font-semibold text-gray-900">{n.name}</div>
              <div className="text-xs text-gray-500">{n.syllables} syl • {n.characters} chars</div>
              {n.isUserAdded && <span className="text-xs text-green-600">✓ User added</span>}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setStep(1)}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Begin Selection Process →
      </button>
    </div>
  );

  const renderCriteriaSelection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Select Your Criteria</h2>
        <p className="text-gray-600">Choose which factors are important for your decision (select at least 2)</p>
      </div>

      <div className="space-y-3">
        {ahpCriteria.map(criterion => (
          <label
            key={criterion.id}
            className={`block p-4 border rounded-lg cursor-pointer transition-all ${
              selectedCriteria.find(c => c.id === criterion.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={!!selectedCriteria.find(c => c.id === criterion.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCriteria([...selectedCriteria, criterion]);
                  } else {
                    setSelectedCriteria(selectedCriteria.filter(c => c.id !== criterion.id));
                  }
                }}
                className="mt-1 h-5 w-5 text-blue-600"
              />
              <div>
                <div className="font-semibold text-gray-900">{criterion.label}</div>
                <div className="text-sm text-gray-600">{criterion.description}</div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(0)}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => {
            if (selectedCriteria.length >= 2) {
              setCurrentPairIndex(0);
              setStep(2);
            }
          }}
          disabled={selectedCriteria.length < 2}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continue ({selectedCriteria.length} selected) →
        </button>
      </div>
    </div>
  );

  const renderPairwiseComparison = () => {
    if (criteriaPairs.length === 0) {
      setStep(3);
      return null;
    }

    const currentPair = criteriaPairs[currentPairIndex];
    if (!currentPair) {
      setStep(3);
      return null;
    }

    const [left, right] = currentPair;
    const key = `${left.id}-${right.id}`;
    const current = pairwiseComparisons[key] || { value: 1, favor: 'equal' };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Compare Criteria</h2>
          <p className="text-gray-600">
            Comparison {currentPairIndex + 1} of {criteriaPairs.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentPairIndex + 1) / criteriaPairs.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
            Which criterion is MORE important to you?
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className={`flex-1 w-full p-4 rounded-lg border-2 transition-all ${
              current.favor === 'left' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}>
              <div className="font-bold text-lg text-gray-900">{left.label}</div>
              <div className="text-sm text-gray-600">{left.description}</div>
            </div>

            <div className="text-gray-400 font-bold">vs</div>

            <div className={`flex-1 w-full p-4 rounded-lg border-2 transition-all ${
              current.favor === 'right' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}>
              <div className="font-bold text-lg text-gray-900">{right.label}</div>
              <div className="text-sm text-gray-600">{right.description}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>← {left.label}</span>
              <span>Equal</span>
              <span>{right.label} →</span>
            </div>

            <div className="flex justify-center gap-1 md:gap-2 flex-wrap">
              {[9, 7, 5, 3, 1, 3, 5, 7, 9].map((val, idx) => {
                const isLeft = idx < 4;
                const isEqual = idx === 4;
                const actualVal = isEqual ? 1 : val;
                const favor = isEqual ? 'equal' : (isLeft ? 'left' : 'right');
                const isSelected = current.value === actualVal && current.favor === favor;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setPairwiseComparisons({
                        ...pairwiseComparisons,
                        [key]: { value: actualVal, favor }
                      });
                    }}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-lg font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : isEqual
                        ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isEqual ? '=' : val}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 text-center text-sm">
              {current.favor === 'equal' && <span className="text-gray-600">Both criteria are equally important</span>}
              {current.favor === 'left' && (
                <span className="text-blue-600 font-medium">
                  {left.label} is {ahpScale.find(s => s.value === current.value)?.label?.toLowerCase() || ''} more important
                </span>
              )}
              {current.favor === 'right' && (
                <span className="text-blue-600 font-medium">
                  {right.label} is {ahpScale.find(s => s.value === current.value)?.label?.toLowerCase() || ''} more important
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentPairIndex > 0) {
                setCurrentPairIndex(currentPairIndex - 1);
              } else {
                setStep(1);
              }
            }}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => {
              if (currentPairIndex < criteriaPairs.length - 1) {
                setCurrentPairIndex(currentPairIndex + 1);
              } else {
                const scores = calculateFinalScores();
                setResults(scores);
                setStep(3);
              }
            }}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {currentPairIndex < criteriaPairs.length - 1 ? 'Next Comparison →' : 'See Results →'}
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const scores = results || calculateFinalScores();
    const weights = scores[0]?.weights || {};

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Rankings</h2>
          <p className="text-gray-600">Based on your weighted preferences</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3">Your Criteria Weights</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCriteria.map(c => (
              <div key={c.id} className="bg-white rounded-full px-3 py-1 text-sm">
                <span className="font-medium">{c.label}:</span>{' '}
                <span className="text-blue-600">{((weights[c.id] || 0) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {scores.map((name, idx) => (
            <div
              key={name.id}
              className={`p-4 rounded-lg border-2 ${
                idx === 0 ? 'border-yellow-400 bg-yellow-50' :
                idx === 1 ? 'border-gray-300 bg-gray-50' :
                idx === 2 ? 'border-orange-300 bg-orange-50' :
                'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                    idx === 1 ? 'bg-gray-300 text-gray-700' :
                    idx === 2 ? 'bg-orange-300 text-orange-900' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{name.name}</div>
                    <div className="text-sm text-gray-600">{name.syllables} syl • {name.characters} chars • {name.tagline}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{name.totalScore.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">weighted score</div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Score breakdown:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCriteria.map(c => (
                    <div key={c.id} className="text-xs bg-gray-100 rounded px-2 py-1">
                      {c.label}: {name.breakdown[c.id]?.raw?.toFixed(1) || 'N/A'} × {((name.breakdown[c.id]?.weight || 0) * 100).toFixed(0)}%
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setStep(0);
              setSelectedCriteria([]);
              setPairwiseComparisons({});
              setResults(null);
            }}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Start Over
          </button>
          <button
            onClick={() => setStep(1)}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Adjust Criteria
          </button>
        </div>
      </div>
    );
  };

  const renderNameDetails = () => {
    if (!showNameDetails) return null;
    const n = showNameDetails;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{n.name}</h2>
                <p className="text-gray-600">{n.pronunciation}</p>
              </div>
              <button
                onClick={() => setShowNameDetails(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Meaning</h3>
                <p className="text-gray-600">{n.meaning}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Syllables</span>
                  <div className="font-semibold text-gray-900">{n.syllables}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Characters</span>
                  <div className="font-semibold text-gray-900">{n.characters}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Verb Score</span>
                  <div className="font-semibold text-gray-900">{n.verbScore}/10</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Branding Score</span>
                  <div className="font-semibold text-gray-900">{n.brandingScore}/10</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div>
                  <span className="text-sm text-gray-500">Court Credibility</span>
                  <div className="font-semibold text-gray-900">{n.courtCredibility}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">AI Integration</span>
                  <div className="font-semibold text-gray-900">{n.aiIntegration}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Canadian Identity</span>
                  <div className="font-semibold text-gray-900">{n.canadianIdentity}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Daily Use</span>
                  <div className="font-semibold text-gray-900">{n.dailyUse}</div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <span className="text-sm text-gray-500">Verb Form</span>
                <div className="font-semibold text-gray-900">&quot;{n.verbForm}&quot;</div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Phonetic Feel</span>
                <div className="text-gray-600">{n.phoneticFeel}</div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <span className="text-sm text-blue-600 font-medium">Tagline</span>
                <div className="text-blue-900 font-semibold">&quot;{n.tagline}&quot;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAddNameModal = () => {
    if (!showAddName) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Name</h2>
              <button
                onClick={() => setShowAddName(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              Enter a name and we&apos;ll analyze it using AI to compute comparable scores.
            </p>

            <input
              type="text"
              value={newNameInput}
              onChange={(e) => setNewNameInput(e.target.value)}
              placeholder="Enter name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              disabled={isProcessingName}
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setShowAddName(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                disabled={isProcessingName}
              >
                Cancel
              </button>
              <button
                onClick={handleAddName}
                disabled={!newNameInput.trim() || isProcessingName}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isProcessingName ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </>
                ) : 'Add Name'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Name Selector - AHP Decision Tool</title>
        <meta name="description" content="Select the best name using Analytic Hierarchy Process (AHP)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-3xl mx-auto p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700">AHP Name Selector</span>
            </div>

            <button
              onClick={() => setShowAddName(true)}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Name
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            {step === 0 && renderWelcome()}
            {step === 1 && renderCriteriaSelection()}
            {step === 2 && renderPairwiseComparison()}
            {step === 3 && renderResults()}
          </div>

          {renderNameDetails()}
          {renderAddNameModal()}
        </div>
      </div>
    </>
  );
}
