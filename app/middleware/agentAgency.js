

module.exports = function (req, res, next) { 
    
    if (req.user.role !== 'agent_agency') return res.status(403).send('Access denied.');
  
    next();
  }