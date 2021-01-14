

module.exports = function (req, res, next) { 
    
    if (req.user.role !== 'admin_agency') return res.status(403).send('Access denied.');
  
    next();
  }