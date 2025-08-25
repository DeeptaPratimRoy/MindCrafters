
        // Sample skill categories
        const skillCategories = {
            technical: ['JavaScript', 'Python', 'Data Analysis', 'Machine Learning', 'Cloud Computing', 'Cybersecurity'],
            creative: ['Graphic Design', 'Video Editing', 'Content Writing', 'UX/UI Design', 'Photography', 'Digital Marketing'],
            leadership: ['Project Management', 'Team Leadership', 'Strategic Planning', 'Public Speaking', 'Mentoring', 'Negotiation'],
            communication: ['Technical Writing', 'Presentation Skills', 'Cross-cultural Communication', 'Client Relations', 'Social Media', 'Copywriting']
        };

        // Career database with sample data
        const careerDatabase = {
            'Software Developer': {
                skills: ['JavaScript', 'Python', 'Problem Solving', 'Technical Writing'],
                description: 'Design, develop, and maintain software applications and systems.',
                growth: '22% (Much faster than average)',
                salary: '$70,000 - $150,000'
            },
            'Data Scientist': {
                skills: ['Python', 'Data Analysis', 'Machine Learning', 'Statistics'],
                description: 'Extract insights from complex data to drive business decisions.',
                growth: '35% (Much faster than average)',
                salary: '$80,000 - $180,000'
            },
            'UX Designer': {
                skills: ['UX/UI Design', 'User Research', 'Prototyping', 'Creative Problem Solving'],
                description: 'Create intuitive and engaging user experiences for digital products.',
                growth: '18% (Much faster than average)',
                salary: '$60,000 - $130,000'
            },
            'Digital Marketing Manager': {
                skills: ['Digital Marketing', 'Social Media', 'Data Analysis', 'Content Writing'],
                description: 'Plan and execute digital marketing campaigns across multiple channels.',
                growth: '14% (Faster than average)',
                salary: '$55,000 - $120,000'
            },
            'Project Manager': {
                skills: ['Project Management', 'Team Leadership', 'Communication', 'Strategic Planning'],
                description: 'Lead teams and coordinate resources to deliver projects successfully.',
                growth: '11% (Faster than average)',
                salary: '$65,000 - $140,000'
            },
            'Cybersecurity Analyst': {
                skills: ['Cybersecurity', 'Risk Assessment', 'Network Security', 'Problem Solving'],
                description: 'Protect organizations from cyber threats and security breaches.',
                growth: '33% (Much faster than average)',
                salary: '$75,000 - $160,000'
            }
        };

        let userSkills = [];

        // Add skill functionality
        document.getElementById('skillInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const skill = this.value.trim();
                if (skill && !userSkills.includes(skill)) {
                    addSkill(skill);
                    this.value = '';
                }
            }
        });

        function addSkill(skill) {
            userSkills.push(skill);
            updateSkillsDisplay();
        }

        function removeSkill(skill) {
            userSkills = userSkills.filter(s => s !== skill);
            updateSkillsDisplay();
        }

        function updateSkillsDisplay() {
            const container = document.getElementById('skillsContainer');
            container.innerHTML = userSkills.map(skill => 
                `<div class="skill-tag">
                    ${skill}
                    <button class="remove-btn" onclick="removeSkill('${skill}')">×</button>
                </div>`
            ).join('');
        }

        function addSampleSkills(category) {
            const skills = skillCategories[category];
            skills.forEach(skill => {
                if (!userSkills.includes(skill)) {
                    addSkill(skill);
                }
            });
        }

        function calculateMatchScore(userSkills, careerSkills) {
            const matches = userSkills.filter(skill => 
                careerSkills.some(careerSkill => 
                    skill.toLowerCase().includes(careerSkill.toLowerCase()) ||
                    careerSkill.toLowerCase().includes(skill.toLowerCase())
                )
            );
            return Math.round((matches.length / careerSkills.length) * 100);
        }

        function generateRecommendations() {
            const name = document.getElementById('name').value;
            const education = document.getElementById('education').value;
            const experience = document.getElementById('experience').value;
            const interests = document.getElementById('interests').value;

            if (!name || !education || !experience || userSkills.length === 0) {
                alert('Please fill in all required fields and add at least one skill.');
                return;
            }

            // Show results section and loading spinner
            document.getElementById('resultsSection').classList.remove('hidden');
            document.getElementById('loadingSpinner').classList.remove('hidden');
            document.getElementById('recommendationsContent').classList.add('hidden');

            // Simulate API call delay
            setTimeout(() => {
                document.getElementById('loadingSpinner').classList.add('hidden');
                document.getElementById('recommendationsContent').classList.remove('hidden');
                
                displayRecommendations();
                displayMarketTrends();
                
                // Smooth scroll to results
                document.getElementById('resultsSection').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 2000);
        }

        function displayRecommendations() {
            const container = document.getElementById('careerRecommendations');
            
            // Calculate match scores and sort careers
            const careerMatches = Object.entries(careerDatabase).map(([career, data]) => ({
                career,
                data,
                matchScore: calculateMatchScore(userSkills, data.skills)
            })).sort((a, b) => b.matchScore - a.matchScore);

            container.innerHTML = careerMatches.map(({career, data, matchScore}) => `
                <div class="career-card">
                    <div class="career-title">${career}</div>
                    <div class="match-score">${matchScore}% Match</div>
                    <div class="career-description">${data.description}</div>
                    
                    <div style="margin: 15px 0;">
                        <strong>Projected Growth:</strong> ${data.growth}<br>
                        <strong>Salary Range:</strong> ${data.salary}
                    </div>
                    
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${matchScore}%"></div>
                    </div>
                    
                    <div class="required-skills">
                        <h4>Key Skills Required:</h4>
                        <div class="skill-list">
                            ${data.skills.map(skill => 
                                `<span class="skill-item ${userSkills.some(userSkill => 
                                    userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                                    skill.toLowerCase().includes(userSkill.toLowerCase())
                                ) ? 'skill-match' : ''}">${skill}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function displayMarketTrends() {
            const trends = [
                {
                    title: "AI & Machine Learning",
                    description: "Demand for AI specialists is growing by 74% annually. Skills in Python, TensorFlow, and data analysis are highly sought after."
                },
                {
                    title: "Remote Work Skills",
                    description: "Digital collaboration tools, time management, and self-motivation are becoming essential for remote positions."
                },
                {
                    title: "Sustainability Focus",
                    description: "Green technology and sustainable business practices are creating new career opportunities across industries."
                },
                {
                    title: "Cybersecurity Demand",
                    description: "With increasing digital threats, cybersecurity roles are expected to grow by 33% through 2030."
                }
            ];

            const container = document.getElementById('marketTrends');
            container.innerHTML = trends.map(trend => `
                <div class="trend-item">
                    <h4 style="color: #2d3748; margin-bottom: 8px;">${trend.title}</h4>
                    <p style="color: #4a5568; line-height: 1.5;">${trend.description}</p>
                </div>
            `).join('');
        }

        // Add some sample skills for demo
        setTimeout(() => {
            addSampleSkills('technical');
        }, 1000);
    